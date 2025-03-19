import { redirect } from '@sveltejs/kit';

const api_auth = 'https://chatr410.alwaysdata.net/R401/r401-Auth/api/endpoint.php';

export async function handle({ event, resolve }) {
    let jwt = event.cookies.get("token");
    console.log(`jwt : bearer ${jwt}`);

    if (jwt) {
        try {
            const res = await fetch(api_auth, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }

            });
            const data = await res.json();
            console.log(`api response: ${data.status_code} url requested ${event.url.pathname}`)
            if (data.status_code === 200) {
                if (event.url.pathname === "/") {
                    throw redirect(302,"/board/accueil");
                }

                return await resolve(event);
            } else {
                event.cookies.delete('token', { path: '/' })
                throw redirect(302,"/")
            }
        } catch (err) {
            event.cookies.delete('token', { path: '/' })
            console.error(err);
            throw redirect(302, '/');
        }
    }else{
        if (event.url.pathname !== "/") {
            throw redirect(302, "/");
        }
        return await resolve(event);
    }
}

