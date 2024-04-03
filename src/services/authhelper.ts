// authHelper.ts
export function isAuthenticated(): boolean {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken)
    // Check if token exists and is not expired
    return !!accessToken; // Assuming token presence means authentication
  }
  