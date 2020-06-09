import base64 from 'base-64';
import url from 'url';

const deserialize = function(s) {
  return JSON.parse(base64.decode(s));
}

export default function (req, res, next) {
  // req is the Node.js http request object
  const parsedUrl = url.parse(req.url, true);
  const queryData = parsedUrl.query;
  const stateStr = queryData['state'];
  const state = stateStr ? deserialize(stateStr) : {};

  // Redirect, forwarding all query params to: /_workspace/settings/connect/webflow
  res.writeHead(302, {
    'Location': `/${state.workspaceSlug}/settings/connect/webflow${parsedUrl.search}`
  });
  res.end();

  next();
}
