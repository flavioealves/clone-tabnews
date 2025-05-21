import database from "infra/database.js"
import { version } from "react";

async function status(request,response){
  const updatedAt = new Date().toISOString();
  // const client = await database.query("SELECT version() AS version, current_setting('max_connections')::int AS max_connections, (SELECT COUNT(*)::int FROM pg_stat_activity WHERE DATNAME = 'local_db') AS act_connections")
  const client = await database.query({
    text: "SELECT version() AS version, current_setting('max_connections')::int AS max_connections, (SELECT COUNT(*)::int FROM pg_stat_activity WHERE DATNAME = $1) AS act_connections",
    values: [process.env.POSTGRES_DB]
  })
  console.log(client)
  response.status(200).json({
    updated_at: updatedAt,
    version: parseInt(client.rows[0].version.split(' ')[1]),
    max_connections: client.rows[0].max_connections,
    act_connections: client.rows[0].act_connections
  });
}

export default status;