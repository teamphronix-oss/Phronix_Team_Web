import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

export async function createDiscoveryCall({
  name,
  email,
  companyName,
  projectType,
  selectedDate,
  selectedTime,
}) {
  const start = new Date(
    `${selectedDate}T${convertTo24Hour(selectedTime)}:00+05:30`
  );

  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",

    conferenceDataVersion: 1,

    sendUpdates: "all",

    requestBody: {
      summary: `Phronix Discovery Call — ${companyName}`,

      description: [
        "Phronix Discovery Call",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company / Venture: ${companyName}`,
        `Project Type: ${projectType}`,
      ].join("\n"),

      start: {
        dateTime: start.toISOString(),
        timeZone: "Asia/Kolkata",
      },

      end: {
        dateTime: end.toISOString(),
        timeZone: "Asia/Kolkata",
      },

      attendees: [
        {
          email,
        },
      ],

      conferenceData: {
        createRequest: {
          requestId: `phronix-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`,

          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  const meetUrl =
    event.data.hangoutLink ||
    event.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri ||
    "";

  return {
    eventId: event.data.id,
    meetUrl,
    htmlLink: event.data.htmlLink,
  };
}

export async function rescheduleDiscoveryCall({
  eventId,
  selectedDate,
  selectedTime,
}) {
  const start = new Date(
    `${selectedDate}T${convertTo24Hour(selectedTime)}:00+05:30`
  );

  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const event = await calendar.events.patch({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    eventId,

    requestBody: {
      start: {
        dateTime: start.toISOString(),
        timeZone: "Asia/Kolkata",
      },

      end: {
        dateTime: end.toISOString(),
        timeZone: "Asia/Kolkata",
      },
    },

    sendUpdates: "all",
  });

  return {
    eventId: event.data.id,
    meetUrl:
      event.data.hangoutLink ||
      event.data.conferenceData?.entryPoints?.find(
        (entry) => entry.entryPointType === "video"
      )?.uri ||
      "",
    htmlLink: event.data.htmlLink,
  };
}

function convertTo24Hour(time) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }

  let hour = Number(match[1]);
  const minute = match[2];
  const period = match[3].toUpperCase();

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${String(hour).padStart(2, "0")}:${minute}`;
}