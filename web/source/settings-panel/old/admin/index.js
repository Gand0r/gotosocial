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

const Promise = require("bluebird");
const React = require("react");
const ReactDom = require("react-dom");

const createPanel = require("../lib/panel");

const Settings = require("./settings");
const Blocks = require("./blocks");

require("../base.css");
require("./style.css");

function AdminPanel({oauth}) {
	/* 
		Features: (issue #78)
		- [ ] Instance information updating
			  GET /api/v1/instance PATCH /api/v1/instance
		- [ ] Domain block creation, viewing, and deletion
			  GET /api/v1/admin/domain_blocks
			  POST /api/v1/admin/domain_blocks
			  GET /api/v1/admin/domain_blocks/DOMAIN_BLOCK_ID, DELETE /api/v1/admin/domain_blocks/DOMAIN_BLOCK_ID
		- [ ] Blocklist import/export
			  GET /api/v1/admin/domain_blocks?export=true
			  POST json file as form field domains to /api/v1/admin/domain_blocks
	*/

	return (
		<React.Fragment>
			<Logout oauth={oauth}/>
			<Settings oauth={oauth} />
			<Blocks oauth={oauth}/>
		</React.Fragment>
	);
}

function Logout({oauth}) {
	return (
		<div>
			<button onClick={oauth.logout}>Logout</button>
		</div>
	);
}

createPanel("GoToSocial Admin Panel", ["admin"], AdminPanel);