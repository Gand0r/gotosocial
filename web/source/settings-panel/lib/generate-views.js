/*
	GoToSocial
	Copyright (C) 2021-2022 GoToSocial Authors admin@gotosocial.org

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

"use strict";

const React = require("react");
const { Link, Route, Redirect } = require("wouter");
const { ErrorBoundary } = require("react-error-boundary");

const ErrorFallback = require("../components/error");
const NavButton = require("../components/nav-button");

function urlSafe(str) {
	return str.toLowerCase().replace(/\s+/g, "-");
}

module.exports = function generateViews(struct) {
	const sidebar = [];
	const panelRouter = [];

	Object.entries(struct).forEach(([name, {Component, entries}]) => {
		let base = `/settings/${urlSafe(name)}`;

		let links = [];
		let routes = [];

		let firstRoute;

		Object.entries(entries).forEach(([name, ViewComponent]) => {
			let url = `${base}/${urlSafe(name)}`;

			if (firstRoute == undefined) {
				firstRoute = `${base}/${urlSafe(name)}`;
			}

			routes.push((
				<Route path={url} key={url}>
					<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
						{/* FIXME: implement onReset */}
						<ViewComponent/>
					</ErrorBoundary>
				</Route>
			));

			links.push(
				<NavButton key={url} href={url} name={name} />
			);
		});

		panelRouter.push(
			<Route key={base} path={base}>
				<Redirect to={firstRoute}/>
			</Route>
		);

		let childrenPath = `${base}/:section`;
		panelRouter.push(
			<Route key={childrenPath} path={childrenPath}>
				<Component routes={routes}/>
			</Route>
		);

		sidebar.push(
			<React.Fragment key={name}>
				<Link href={firstRoute}>
					<a>
						<h2>{name}</h2>
					</a>
				</Link>
				<nav>
					{links}
				</nav>
			</React.Fragment>
		);
	});

	return {sidebar, panelRouter};
};