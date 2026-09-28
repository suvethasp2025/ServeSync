const eventUrl = "/api/events";
const volunteerUrl = "/api/volunteers";
const signupUrl = "/api/signups";
const attendanceUrl = "/api/attendance";


/* ================= PAGE NAVIGATION ================= */

function showSection(sectionId, element) {

    document.querySelectorAll(".content-section")
        .forEach(section => {
            section.classList.remove("active-section");
        });

    document.getElementById(sectionId)
        .classList.add("active-section");


    document.querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (element) {
        element.classList.add("active");
    }


    if (sectionId === "dashboard") {
        loadDashboard();
    }

    if (sectionId === "events") {
        loadEvents();
    }

    if (sectionId === "volunteers") {
        loadVolunteers();
    }

    if (sectionId === "signups") {
        loadSignups();
    }

    if (sectionId === "attendance") {
        loadAttendance();
    }
}


/* ================= SIDEBAR ================= */

function toggleSidebar() {

    document.querySelector(".sidebar")
        .classList.toggle("mobile-open");
}


/* ================= MODALS ================= */

function openEventModal() {

    document.getElementById("eventId").value = "";

    document.getElementById("eventName").value = "";

    document.getElementById("eventLocation").value = "";

    document.getElementById("eventDate").value = "";

    document.getElementById("eventCapacity").value = "";

    document.getElementById("eventModalTitle").innerText =
        "Add New Event";

    document.getElementById("eventModal")
        .classList.add("show");
}


function openVolunteerModal() {

    document.getElementById("volunteerId").value = "";

    document.getElementById("volunteerName").value = "";

    document.getElementById("volunteerEmail").value = "";

    document.getElementById("volunteerPhone").value = "";

    document.getElementById("volunteerModalTitle").innerText =
        "Add Volunteer";

    document.getElementById("volunteerModal")
        .classList.add("show");
}


function openSignupModal() {

    document.getElementById("signupEventId").value = "";

    document.getElementById("signupVolunteerId").value = "";

    document.getElementById("signupStatus").value =
        "Registered";

    document.getElementById("signupModal")
        .classList.add("show");
}


function openAttendanceModal() {

    document.getElementById("attendanceEventId").value = "";

    document.getElementById("attendanceVolunteerId").value = "";

    document.getElementById("attendanceStatus").value =
        "Present";

    document.getElementById("attendanceModal")
        .classList.add("show");
}


function closeModal(id) {

    document.getElementById(id)
        .classList.remove("show");
}


/* ================= TOAST ================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    document.getElementById("toastMessage")
        .innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* ================= EVENTS ================= */

async function loadEvents() {

    try {

        const response = await fetch(eventUrl);

        if (!response.ok) {
            throw new Error("Unable to load events");
        }

        const events = await response.json();

        const table =
            document.getElementById("eventTableBody");

        table.innerHTML = "";


        if (events.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        No events found.
                    </td>
                </tr>
            `;

            return;
        }


        events.forEach(event => {

            table.innerHTML += `

                <tr>

                    <td>#${event.id}</td>

                    <td>
                        <strong>${escapeHtml(event.name)}</strong>
                    </td>

                    <td>
                        ${escapeHtml(event.location)}
                    </td>

                    <td>
                        ${event.date || "-"}
                    </td>

                    <td>
                        ${event.volunteerCapacity}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="action-btn edit"
                                onclick="editEvent(${event.id})"
                                title="Edit">

                                ✎

                            </button>

                            <button
                                class="action-btn delete"
                                onclick="deleteEvent(${event.id})"
                                title="Delete">

                                ×

                            </button>

                        </div>

                    </td>

                </tr>

            `;
        });


        updateEventCount(events);

        displayDashboardEvents(events);

    }
    catch (error) {

        console.error(error);

        showToast("Unable to load events");

    }
}


/* ================= SAVE EVENT ================= */

async function saveEvent(event) {

    event.preventDefault();


    const id =
        document.getElementById("eventId").value;


    const eventData = {

        name:
        document.getElementById("eventName").value,

        location:
        document.getElementById("eventLocation").value,

        date:
        document.getElementById("eventDate").value,

        volunteerCapacity:
            Number(
                document.getElementById("eventCapacity").value
            )
    };


    try {

        let response;


        if (id) {

            response = await fetch(
                eventUrl + "/" + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(eventData)
                }
            );

        }
        else {

            response = await fetch(
                eventUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(eventData)
                }
            );

        }


        if (!response.ok) {
            throw new Error("Unable to save event");
        }


        closeModal("eventModal");

        showToast(
            id
                ? "Event updated successfully"
                : "Event created successfully"
        );


        loadEvents();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast("Unable to save event");

    }
}


/* ================= EDIT EVENT ================= */

async function editEvent(id) {

    try {

        const response =
            await fetch(eventUrl + "/" + id);

        const event =
            await response.json();


        document.getElementById("eventId").value =
            event.id;

        document.getElementById("eventName").value =
            event.name;

        document.getElementById("eventLocation").value =
            event.location;

        document.getElementById("eventDate").value =
            event.date;

        document.getElementById("eventCapacity").value =
            event.volunteerCapacity;


        document.getElementById("eventModalTitle").innerText =
            "Edit Event";


        document.getElementById("eventModal")
            .classList.add("show");

    }
    catch (error) {

        console.error(error);

        showToast("Unable to load event");

    }
}


/* ================= DELETE EVENT ================= */

async function deleteEvent(id) {

    if (!confirm("Are you sure you want to delete this event?")) {
        return;
    }


    try {

        const response =
            await fetch(eventUrl + "/" + id, {
                method: "DELETE"
            });


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        showToast("Event deleted successfully");

        loadEvents();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast("Unable to delete event");

    }
}


/* ================= VOLUNTEERS ================= */

async function loadVolunteers() {

    try {

        const response =
            await fetch(volunteerUrl);

        if (!response.ok) {
            throw new Error("Unable to load volunteers");
        }

        const volunteers =
            await response.json();


        const table =
            document.getElementById(
                "volunteerTableBody"
            );

        table.innerHTML = "";


        if (volunteers.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5"
                        class="empty-state">
                        No volunteers found.
                    </td>
                </tr>
            `;

            return;
        }


        volunteers.forEach(volunteer => {

            table.innerHTML += `

                <tr>

                    <td>#${volunteer.id}</td>

                    <td>
                        <strong>
                            ${escapeHtml(volunteer.name)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(volunteer.email)}
                    </td>

                    <td>
                        ${escapeHtml(volunteer.phone)}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="action-btn edit"
                                onclick="editVolunteer(${volunteer.id})">

                                ✎

                            </button>

                            <button
                                class="action-btn delete"
                                onclick="deleteVolunteer(${volunteer.id})">

                                ×

                            </button>

                        </div>

                    </td>

                </tr>

            `;
        });


        document.getElementById("totalVolunteers")
            .innerText = volunteers.length;

    }
    catch (error) {

        console.error(error);

        showToast("Unable to load volunteers");

    }
}


/* ================= SAVE VOLUNTEER ================= */

async function saveVolunteer(event) {

    event.preventDefault();


    const id =
        document.getElementById("volunteerId").value;


    const volunteer = {

        name:
        document.getElementById("volunteerName").value,

        email:
        document.getElementById("volunteerEmail").value,

        phone:
        document.getElementById("volunteerPhone").value
    };


    try {

        let response;


        if (id) {

            response = await fetch(
                volunteerUrl + "/" + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(volunteer)
                }
            );

        }
        else {

            response = await fetch(
                volunteerUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(volunteer)
                }
            );

        }


        if (!response.ok) {
            throw new Error("Unable to save volunteer");
        }


        closeModal("volunteerModal");

        showToast(
            id
                ? "Volunteer updated successfully"
                : "Volunteer added successfully"
        );


        loadVolunteers();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast("Unable to save volunteer");

    }
}


/* ================= EDIT VOLUNTEER ================= */

async function editVolunteer(id) {

    try {

        const response =
            await fetch(volunteerUrl + "/" + id);

        const volunteer =
            await response.json();


        document.getElementById("volunteerId").value =
            volunteer.id;

        document.getElementById("volunteerName").value =
            volunteer.name;

        document.getElementById("volunteerEmail").value =
            volunteer.email;

        document.getElementById("volunteerPhone").value =
            volunteer.phone;


        document.getElementById(
            "volunteerModalTitle"
        ).innerText = "Edit Volunteer";


        document.getElementById("volunteerModal")
            .classList.add("show");

    }
    catch (error) {

        console.error(error);

        showToast("Unable to load volunteer");

    }
}


/* ================= DELETE VOLUNTEER ================= */

async function deleteVolunteer(id) {

    if (!confirm(
        "Are you sure you want to delete this volunteer?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                volunteerUrl + "/" + id,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        showToast("Volunteer deleted successfully");

        loadVolunteers();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast("Unable to delete volunteer");

    }
}


/* ================= SIGNUPS ================= */

async function loadSignups() {

    try {

        const response =
            await fetch(signupUrl);

        const signups =
            await response.json();


        const table =
            document.getElementById(
                "signupTableBody"
            );

        table.innerHTML = "";


        if (signups.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5"
                        class="empty-state">
                        No signups found.
                    </td>
                </tr>
            `;

            document.getElementById("totalSignups")
                .innerText = "0";

            return;
        }


        signups.forEach(signup => {

            const statusClass =
                signup.status === "Registered"
                    ? "status-registered"
                    : "status-cancelled";


            table.innerHTML += `

                <tr>

                    <td>#${signup.id}</td>

                    <td>${signup.eventId}</td>

                    <td>${signup.volunteerId}</td>

                    <td>

                        <span class="status ${statusClass}">

                            ${escapeHtml(signup.status)}

                        </span>

                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="action-btn delete"
                                onclick="deleteSignup(${signup.id})">

                                ×

                            </button>

                        </div>

                    </td>

                </tr>

            `;
        });


        document.getElementById("totalSignups")
            .innerText = signups.length;

    }
    catch (error) {

        console.error(error);

        showToast("Unable to load signups");

    }
}


/* ================= SAVE SIGNUP ================= */

async function saveSignup(event) {

    event.preventDefault();


    const signup = {

        eventId:
            Number(
                document.getElementById(
                    "signupEventId"
                ).value
            ),

        volunteerId:
            Number(
                document.getElementById(
                    "signupVolunteerId"
                ).value
            ),

        status:
        document.getElementById(
            "signupStatus"
        ).value
    };


    try {

        const response =
            await fetch(
                signupUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(signup)
                }
            );


        if (!response.ok) {
            throw new Error("Signup failed");
        }


        closeModal("signupModal");

        showToast(
            "Volunteer registered successfully"
        );

        loadSignups();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast("Unable to create signup");

    }
}


/* ================= DELETE SIGNUP ================= */

async function deleteSignup(id) {

    if (!confirm(
        "Are you sure you want to delete this signup?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                signupUrl + "/" + id,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        showToast("Signup deleted");

        loadSignups();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast("Unable to delete signup");

    }
}


/* ================= ATTENDANCE ================= */

async function loadAttendance() {

    try {

        const response =
            await fetch(attendanceUrl);

        const records =
            await response.json();


        const table =
            document.getElementById(
                "attendanceTableBody"
            );

        table.innerHTML = "";


        if (records.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5"
                        class="empty-state">
                        No attendance records found.
                    </td>
                </tr>
            `;

            document.getElementById("totalAttendance")
                .innerText = "0";

            return;
        }


        records.forEach(record => {

            const statusClass =
                record.attendanceStatus === "Present"
                    ? "status-present"
                    : "status-absent";


            table.innerHTML += `

                <tr>

                    <td>#${record.id}</td>

                    <td>${record.eventId}</td>

                    <td>${record.volunteerId}</td>

                    <td>

                        <span class="status ${statusClass}">

                            ${escapeHtml(
                record.attendanceStatus
            )}

                        </span>

                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="action-btn delete"
                                onclick="deleteAttendance(${record.id})">

                                ×

                            </button>

                        </div>

                    </td>

                </tr>

            `;
        });


        document.getElementById("totalAttendance")
            .innerText = records.length;

    }
    catch (error) {

        console.error(error);

        showToast("Unable to load attendance");

    }
}


/* ================= SAVE ATTENDANCE ================= */

async function saveAttendance(event) {

    event.preventDefault();


    const attendance = {

        eventId:
            Number(
                document.getElementById(
                    "attendanceEventId"
                ).value
            ),

        volunteerId:
            Number(
                document.getElementById(
                    "attendanceVolunteerId"
                ).value
            ),

        attendanceStatus:
        document.getElementById(
            "attendanceStatus"
        ).value
    };


    try {

        const response =
            await fetch(
                attendanceUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(attendance)
                }
            );


        if (!response.ok) {
            throw new Error("Attendance failed");
        }


        closeModal("attendanceModal");

        showToast(
            "Attendance saved successfully"
        );

        loadAttendance();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast(
            "Unable to save attendance"
        );

    }
}


/* ================= DELETE ATTENDANCE ================= */

async function deleteAttendance(id) {

    if (!confirm(
        "Are you sure you want to delete this attendance record?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                attendanceUrl + "/" + id,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        showToast("Attendance deleted");

        loadAttendance();

        loadDashboard();

    }
    catch (error) {

        console.error(error);

        showToast("Unable to delete attendance");

    }
}


/* ================= DASHBOARD ================= */

async function loadDashboard() {

    try {

        const [
            eventsResponse,
            volunteersResponse,
            signupsResponse,
            attendanceResponse
        ] = await Promise.all([

            fetch(eventUrl),

            fetch(volunteerUrl),

            fetch(signupUrl),

            fetch(attendanceUrl)

        ]);


        const events =
            await eventsResponse.json();

        const volunteers =
            await volunteersResponse.json();

        const signups =
            await signupsResponse.json();

        const attendance =
            await attendanceResponse.json();


        document.getElementById("totalEvents")
            .innerText = events.length;

        document.getElementById("totalVolunteers")
            .innerText = volunteers.length;

        document.getElementById("totalSignups")
            .innerText = signups.length;

        document.getElementById("totalAttendance")
            .innerText = attendance.length;


        displayDashboardEvents(events);

    }
    catch (error) {

        console.error(error);

    }
}


function updateEventCount(events) {

    document.getElementById("totalEvents")
        .innerText = events.length;
}


function displayDashboardEvents(events) {

    const container =
        document.getElementById(
            "dashboardEvents"
        );


    if (!events || events.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                No events available
            </div>
        `;

        return;
    }


    const latestEvents =
        events.slice(-4).reverse();


    container.innerHTML = "";


    latestEvents.forEach(event => {

        container.innerHTML += `

            <div class="event-row">

                <div>

                    <strong>
                        ${escapeHtml(event.name)}
                    </strong>

                    <span>
                        ${escapeHtml(event.location)}
                    </span>

                </div>

                <span>
                    ${event.date}
                </span>

            </div>

        `;

    });
}


/* ================= SEARCH ================= */

function filterEvents() {

    const search =
        document.getElementById(
            "eventSearch"
        ).value.toLowerCase();


    document.querySelectorAll(
        "#eventTableBody tr"
    ).forEach(row => {

        row.style.display =
            row.innerText
                .toLowerCase()
                .includes(search)
                ? ""
                : "none";

    });
}


function filterVolunteers() {

    const search =
        document.getElementById(
            "volunteerSearch"
        ).value.toLowerCase();


    document.querySelectorAll(
        "#volunteerTableBody tr"
    ).forEach(row => {

        row.style.display =
            row.innerText
                .toLowerCase()
                .includes(search)
                ? ""
                : "none";

    });
}


/* ================= SECURITY HELPER ================= */

function escapeHtml(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ================= INITIAL LOAD ================= */

window.addEventListener("load", function () {

    loadDashboard();

    loadEvents();

    loadVolunteers();

    loadSignups();

    loadAttendance();

});