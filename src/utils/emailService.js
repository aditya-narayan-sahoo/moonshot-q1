const BASE_URL = "https://flipkart-email-mock.now.sh";

export const fetchEmails = async (pageNumber = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/?page=${pageNumber}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch emails (Page ${pageNumber}).`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching emails:", error.message);
    throw error;
  }
};

export const fetchEmailBody = async (emailId) => {
  try {
    const response = await fetch(`${BASE_URL}/?id=${emailId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch email body for ID: ${emailId}.`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching email body:", error.message);
    throw error;
  }
};
