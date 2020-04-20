//https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
const isNumeric = (value) => {
    return /^-{0,1}\d+$/.test(value);
}


exports.validatePostOneItem = (data) => {
    let errors = {}
    if (!(data.name)) {
        errors.name = 'Missing required field: name'
    } else {
        if (!(data.name.trim())) {
            errors.name = "Item's name can't be blank"
        }
    }

    if (!(data.price)) {
        errors.price = 'Missing required field: price'
    } else {
        if ((isNumeric(data.price)) ) {
            if (data.price <= 0) {
                errors.price = "Price can't be negative"
            } else if (data.price >= 500.0) {
                errors.price = "Price can't be greater than $500"
            }
        } else {
            errors.price = "Price must be a number"
        }
    }

    if (!(data.description)) {
        errors.description = 'Missing required field: description'
    } else {
        if (!(data.description.trim())) {
            errors.description = "Item's description can't be blank"
        }
    }

    return errors

}

exports.validateUpdateOneItem = (data) => {
    let errors = {}

    if ('name' in data) {
        if (!(data.name.trim())) {
            errors.name = "Item's name can't be blank"
        }
    }

    if ('price' in data) {
        if ((isNumeric(data.price)) ) {
            if (data.price <= 0) {
                errors.price = "Price can't be negative"
            } else if (data.price >= 500.0) {
                errors.price = "Price can't be greater than $500"
            }
        } else {
            errors.price = "Price must be a number"
        }
    }

    if ('description' in data) {
        if (!(data.description.trim())) {
            errors.description = "Item's description can't be blank"
        }
    }

    if ('isAvailable' in data) {
        if (typeof data.isAvailable !== "boolean"){
            errors.isAvailable = "isAvailable must be boolean"
        }
    }

    return errors
}