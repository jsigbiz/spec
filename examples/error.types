type OptionError<T> := {
    option?: T,
    message: String,
    type: "OptionError"
}

type ValidationError := {
    errors: Array<Error>,
    message: String,
    type: "ValidationError"
}

error/option := (String, T) => OptionError<T>
error/validation := (Array<Error>) => ValidationError
