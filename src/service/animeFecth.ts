export async function animeFetch(type: string) {
    const response = await fetch(`https://api.aniapi.com/v1/${type}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer <YOUR_JWT>',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    });

    const responseJson = await response.json()
    return responseJson
}