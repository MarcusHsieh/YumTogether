import { redirect } from "react-router-dom";
import { deleteYum } from "../yums"; 


export async function action({ params }) {
  const yumId = params.yumId; 

  const success = await deleteYum(yumId); 

  if (success) {
    return redirect("/home"); 
  } else {
    throw new Error(`Failed to delete Yum with ID: ${yumId}`); // 
  }
}
