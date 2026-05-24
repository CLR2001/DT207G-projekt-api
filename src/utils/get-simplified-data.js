export function getSimplifiedDetails(error) {
  const simplifiedDetails = {};

  if (error && error.errors) {
    for (const key in error.errors) {
      simplifiedDetails[key] = error.errors[key].message;
    }
  }
  
  return simplifiedDetails;
}