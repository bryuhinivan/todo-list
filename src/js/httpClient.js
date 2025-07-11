export class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(url) {
    const response = await fetch(`${this.baseUrl}/${url}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async post(url, body) {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async delete(url, id) {
    const response = await fetch(`${this.baseUrl}/${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  async patch(url, body, id) {
    const response = await fetch(`${this.baseUrl}/${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

export const httpClient = new HttpClient("https://2966e7f6fec89ed2.mokky.dev")