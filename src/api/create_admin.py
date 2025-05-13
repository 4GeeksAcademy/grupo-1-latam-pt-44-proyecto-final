import requests
import json
import urllib3
import os
import time

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

base_url = os.getenv("VITE_BACKEND_URL")
headers_json = {'Content-Type': 'application/json'}
ssl_verification = False


def post_api_request(endpoint, payload):
    url = f"{base_url}{endpoint}"
    try:
        response = requests.post(url, headers=headers_json, data=json.dumps(
            payload), verify=ssl_verification)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] {endpoint} → {e}")
        return None


def create_admin():
    results = []

    def safe_post(endpoint, payload, tipo, identificador):
        print(f"[POST] {tipo}: {identificador}")
        result = post_api_request(endpoint, payload)
        results.append({"type": tipo, "data": identificador, "result": result})
        print(result)
        # time.sleep(4)  # Esperar 4 SEGUNDOS antes de la siguiente petición

    # USERS
    users = [

        {"username": "admin", "nombre": "admin", "apellido": "admin", "email": "admin@example.com",
            "password": "admin123", "is_active": True, "rol": "ADMIN"}
    ]

    for u in users:
        safe_post("/register", u, "user", u["username"])



    print("\n✅ Seed finalizado.")
    return results

if __name__ == "__main__":
    run_seed()