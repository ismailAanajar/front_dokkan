type Error = {
  error: any;
  setError: any
}

export const errorHandling = ({error, setError}:Error) => {
  let focused = false;
        Object.keys(error.errors).forEach((key) => {
          setError(
            key as any,
            { message: error.errors[key][0] },
            { shouldFocus: !focused }
          );

          if (!focused) {
            focused = true;
          }
        });
}