// Get the cookie out of the cookie store

const getCookie = async (name) => {
    const cookie = await cookieStore.get(name)
    return cookie
}
const payloadCookie = await getCookie("jwt_access_payload")
if (payloadCookie) {
    console.log(payloadCookie)
    console.log(payloadCookie.value)
    // The cookie value is a JSON-formatted string, so parse it
    const encodedPayload = JSON.parse(payloadCookie.value);
    console.log(encodedPayload)
    // Convert the encoded payload from base64 to normal string
    const decodedPayload = atob(encodedPayload)
    // The payload is a JSON-formatted string, so parse it
    const payload = JSON.parse(decodedPayload)
    // Print the payload
    console.log(payload);

    // Check if "events.add_conference" is in the permissions.
    // If it is, remove 'd-none' from the link
    if (payload.user.perms.includes("events.add_conference")) {
        console.log("yea?")
        document.getElementById("nav-con").classList.remove("d-none")
    }
    // Check if "events.add_location" is in the permissions.
    // If it is, remove 'd-none' from the link
    if (payload.user.perms.includes("events.add_location")) {
        document.getElementById("nav-loc").classList.remove("d-none")
    }
    if (payload.user.perms.includes("presentations.add_presentation")) {
        document.getElementById("nav-pre").classList.remove("d-none")
    }

}
