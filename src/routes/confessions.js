const { listConfessions } = require("../model/confessions.js");
const { Layout } = require("../templates.js");

function get(req, res) {
  const current_user = req.session && req.session.user_id;
  if (current_user !== req.params.user_id) {
    return res.status(401).send("<h1>You aren't allowed to see that</h1>");
  }
  const confessions = listConfessions(req.params.user_id);
  const title = "Your secrets";
  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1>
      <ul>
        ${confessions
          .map((entry) => `<li>${entry.created_at}<br>${entry.content}</li>`)
          .join("")}
      </ul>
    </div>
  `;
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };
