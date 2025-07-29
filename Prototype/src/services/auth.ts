// This is the mock auth service. It simulates API calls.

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  console.log("MOCK: Attempting login for:", payload.email);

  // Simulate a network delay of 1 second to feel like a real API call.
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check for Tourist credentials
  if (payload.email === "tourist@test.com" && payload.password === "password123") {
    console.log("MOCK: Login successful for Tourist!");
    return {
      token: "mock-jwt-token-for-tourist-12345",
      user: {
        id: "user-1",
        name: "Test Tourist",
        email: "tourist@test.com",
        role: "tourist",
      },
    };
  } 
  
  // Check for Guide credentials
  if (payload.email === "guide@test.com" && payload.password === "password123") {
    console.log("MOCK: Login successful for Guide!");
    return {
      token: "mock-jwt-token-for-guide-67890",
      user: {
        id: "user-2",
        name: "Test Guide",
        email: "guide@test.com",
        role: "guide",
      },
    };
  }

  // Check for Artisan credentials
  if (payload.email === "artisan@test.com" && payload.password === "password123") {
    console.log("MOCK: Login successful for Artisan!");
    return {
      token: "mock-jwt-token-for-artisan-abcde",
      user: {
        id: "user-3",
        name: "Test Artisan",
        email: "artisan@test.com",
        role: "artisan",
      },
    };
  }

  // If no credentials match, fail the login
  console.log("MOCK: Login failed. Invalid credentials.");
  throw new Error("Invalid credentials provided.");
};

// The signup function can remain as a placeholder for now.
export const signupUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  console.log("MOCK: Simulating signup for:", payload.email);
  // In a real app, this would create a user and return their data.
  return {
    token: "fake-signup-token-for-" + payload.email,
    user: {
      id: "user-new-" + Math.random(), // Generate a random mock ID
      name: payload.name,
      email: payload.email,
      role: payload.role,
    },
  };
};
