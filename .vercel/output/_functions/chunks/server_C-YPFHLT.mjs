import { t as __commonJSMin } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as pool } from "./client_DuhrWT4e.mjs";
import { Auth } from "@auth/core";
import "dotenv/config";
import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import bcrypt from "bcryptjs";
//#region node_modules/.pnpm/set-cookie-parser@2.7.2/node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defaultParseOptions = {
		decodeValues: true,
		map: false,
		silent: false
	};
	function isForbiddenKey(key) {
		return typeof key !== "string" || key in {};
	}
	function createNullObj() {
		return Object.create(null);
	}
	function isNonEmptyString(str) {
		return typeof str === "string" && !!str.trim();
	}
	function parseString(setCookieValue, options) {
		var parts = setCookieValue.split(";").filter(isNonEmptyString);
		var parsed = parseNameValuePair(parts.shift());
		var name = parsed.name;
		var value = parsed.value;
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (isForbiddenKey(name)) return null;
		try {
			value = options.decodeValues ? decodeURIComponent(value) : value;
		} catch (e) {
			console.error("set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.", e);
		}
		var cookie = createNullObj();
		cookie.name = name;
		cookie.value = value;
		parts.forEach(function(part) {
			var sides = part.split("=");
			var key = sides.shift().trimLeft().toLowerCase();
			if (isForbiddenKey(key)) return;
			var value = sides.join("=");
			if (key === "expires") cookie.expires = new Date(value);
			else if (key === "max-age") {
				var n = parseInt(value, 10);
				if (!Number.isNaN(n)) cookie.maxAge = n;
			} else if (key === "secure") cookie.secure = true;
			else if (key === "httponly") cookie.httpOnly = true;
			else if (key === "samesite") cookie.sameSite = value;
			else if (key === "partitioned") cookie.partitioned = true;
			else if (key) cookie[key] = value;
		});
		return cookie;
	}
	function parseNameValuePair(nameValuePairStr) {
		var name = "";
		var value = "";
		var nameValueArr = nameValuePairStr.split("=");
		if (nameValueArr.length > 1) {
			name = nameValueArr.shift();
			value = nameValueArr.join("=");
		} else value = nameValuePairStr;
		return {
			name,
			value
		};
	}
	function parse(input, options) {
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!input) {
			if (!options.map) return [];
			else return createNullObj();
		}
		if (input.headers) {
			if (typeof input.headers.getSetCookie === "function") input = input.headers.getSetCookie();
			else if (input.headers["set-cookie"]) input = input.headers["set-cookie"];
			else {
				var sch = input.headers[Object.keys(input.headers).find(function(key) {
					return key.toLowerCase() === "set-cookie";
				})];
				if (!sch && input.headers.cookie && !options.silent) console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
				input = sch;
			}
		}
		if (!Array.isArray(input)) input = [input];
		if (!options.map) return input.filter(isNonEmptyString).map(function(str) {
			return parseString(str, options);
		}).filter(Boolean);
		else {
			var cookies = createNullObj();
			return input.filter(isNonEmptyString).reduce(function(cookies, str) {
				var cookie = parseString(str, options);
				if (cookie && !isForbiddenKey(cookie.name)) cookies[cookie.name] = cookie;
				return cookies;
			}, cookies);
		}
	}
	function splitCookiesString(cookiesString) {
		if (Array.isArray(cookiesString)) return cookiesString;
		if (typeof cookiesString !== "string") return [];
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	module.exports = parse;
	module.exports.parse = parse;
	module.exports.parseString = parseString;
	module.exports.splitCookiesString = splitCookiesString;
}));
//#endregion
//#region node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/config.ts
var defineConfig = (config) => {
	config.prefix ??= "/api/auth";
	config.basePath = config.prefix;
	return config;
};
//#endregion
//#region auth.config.ts
var import_set_cookie = require_set_cookie();
//#endregion
//#region \0auth:config
var _auth_config_default = defineConfig({
	trustHost: true,
	adapter: PostgresAdapter(pool),
	providers: [Google({
		clientId: process.env.GOOGLE_CLIENT_ID || Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, { AUTH_SECRET: "super-secret-key-for-development-only-1234567890" })?.GOOGLE_CLIENT_ID || "",
		clientSecret: process.env.GOOGLE_CLIENT_SECRET || Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, { AUTH_SECRET: "super-secret-key-for-development-only-1234567890" })?.GOOGLE_CLIENT_SECRET || ""
	}), Credentials({
		name: "Credenciales",
		credentials: {
			email: {
				label: "Correo Electrónico",
				type: "email"
			},
			password: {
				label: "Contraseña",
				type: "password"
			}
		},
		async authorize(credentials) {
			const identifier = (credentials?.email || credentials?.username)?.trim();
			const password = credentials?.password;
			if (!identifier || !password) {
				console.warn("[Auth] Intento de login sin email/usuario o contraseña");
				return null;
			}
			try {
				console.log(`[Auth] Consultando usuario en PostgreSQL: ${identifier}`);
				const user = (await pool.query("SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(name) = LOWER($1)", [identifier])).rows[0];
				if (!user) {
					console.warn(`[Auth] Usuario no encontrado: ${identifier}`);
					return null;
				}
				let isValidPassword = false;
				try {
					if (user.password && (user.password.startsWith("$2a$") || user.password.startsWith("$2b$"))) isValidPassword = await bcrypt.compare(password, user.password);
				} catch (bcryptErr) {
					console.warn("[Auth] Error comparando hash bcrypt:", bcryptErr);
				}
				if (!isValidPassword && user.password === password) isValidPassword = true;
				if (isValidPassword) {
					console.log(`[Auth] Login exitoso: ${user.email} (Rol: ${user.role || "Usuario X"})`);
					return {
						id: user.id.toString(),
						name: user.name || user.email.split("@")[0],
						email: user.email,
						image: user.image || null,
						role: user.role || "Usuario X"
					};
				}
				console.warn(`[Auth] Contraseña incorrecta para: ${identifier}`);
				return null;
			} catch (error) {
				console.error("[Auth] Error al consultar PostgreSQL:", error);
				return null;
			}
		}
	})],
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET || "super-secret-key-for-development-only-1234567890",
	pages: { signIn: "/signin" },
	callbacks: {
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.sub;
				session.user.role = token.role || "Usuario X";
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
				token.role = user.role || "Usuario X";
			}
			return token;
		}
	}
});
//#endregion
//#region node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/server.ts
var actions = [
	"providers",
	"session",
	"csrf",
	"signin",
	"signout",
	"callback",
	"verify-request",
	"error"
];
function AstroAuthHandler(prefix, options = _auth_config_default) {
	return async ({ cookies, request }) => {
		const url = new URL(request.url);
		const action = url.pathname.slice(prefix.length + 1).split("/")[0];
		if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) return;
		const res = await Auth(request, options);
		if ([
			"callback",
			"signin",
			"signout"
		].includes(action)) {
			const getSetCookie = res.headers.getSetCookie();
			if (getSetCookie.length > 0) {
				getSetCookie.forEach((cookie) => {
					const { name, value, ...options2 } = (0, import_set_cookie.parseString)(cookie);
					cookies.set(name, value, options2);
				});
				res.headers.delete("Set-Cookie");
			}
		}
		return res;
	};
}
function AstroAuth(options = _auth_config_default) {
	const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, {
		AUTH_SECRET: "super-secret-key-for-development-only-1234567890",
		NODE: "/opt/homebrew/Cellar/node/25.8.0/bin/node",
		NODE_ENV: "production"
	});
	options.secret ??= AUTH_SECRET;
	options.trustHost ??= !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production");
	const { prefix = "/api/auth", ...authOptions } = options;
	const handler = AstroAuthHandler(prefix, authOptions);
	return {
		async GET(context) {
			return await handler(context);
		},
		async POST(context) {
			return await handler(context);
		}
	};
}
async function getSession(req, options = _auth_config_default) {
	options.secret ??= "super-secret-key-for-development-only-1234567890";
	options.trustHost ??= true;
	const url = new URL(`${options.prefix}/session`, req.url);
	const response = await Auth(new Request(url, { headers: req.headers }), options);
	const { status = 200 } = response;
	const data = await response.json();
	if (!data || !Object.keys(data).length) return null;
	if (status === 200) return data;
	throw new Error(data.message);
}
//#endregion
export { getSession as n, _auth_config_default as r, AstroAuth as t };
