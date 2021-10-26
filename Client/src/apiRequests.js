const API_URL = "http://localhost:5000"

export function getNumber() {
    return new Promise((resolve) => {
        const request = new Request(API_URL + "/number", { method: "GET" });
        fetch(request)
            .then(async (resp) => {
                if (resp.ok) {
                    resolve(await resp.json());
                }
            })
            .catch((err) => { console.log("getNumber Error:", err) });
    });
}

export function setNumber(number) {
    return new Promise((resolve) => {
        const request = new Request(API_URL + "/number", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ number: number }) });
        fetch(request)
            .then((resp) => {
                if (resp.ok) {
                    resolve();
                }
            })
            .catch((err) => {
                console.log("setNumber Error:", err);
            });
    });
}
