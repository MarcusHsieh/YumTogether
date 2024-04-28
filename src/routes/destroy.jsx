import { redirect } from "react-router-dom";
import { deleteYum } from "../yums"; // Adjust import to reference "Yums"

// Define action for deleting a "Yum"
export async function action({ params }) {
  const yumId = params.yumId; // Get the Yum ID from parameters

  // Delete the Yum using the given ID
  const success = await deleteYum(yumId); 

  // Redirect to the homepage or another appropriate location after deletion
  if (success) {
    return redirect("/home"); // Redirect to the main page or any desired route
  } else {
    throw new Error(`Failed to delete Yum with ID: ${yumId}`); // Handle deletion failure
  }
}
