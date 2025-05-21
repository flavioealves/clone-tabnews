test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http:localhost:3000/api/v1/status");
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.version).toBeDefined();
  expect(responseBody.version).toEqual(16)
  
  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.max_connections).toEqual(100);


  expect(responseBody.act_connections).toBeDefined();
  expect(responseBody.act_connections).toEqual(1);

  expect(response.status).toBe(200);
})