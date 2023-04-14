const REGEXP = {
    IS_UUID: /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/,

}

const USER = {
    NAME: {
        LENGTH: [3, 30]
    },
    PWD: {
        LENGTH: [8, 20],
        REGEXP: /^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    },
    ROLES: {
        ENUM: ['user', 'admin'],
        DEFAULT: 'user'
    },
}

const CATEGORY = {
    NAME: {
        LENGTH: [3, 50]
    }
}

const PRODUCT = {
    NAME: {
        LENGTH: [3, 80]
    },
    DESC: {
        LENGTH: [20, 700]
    },
}

module.exports = {
    REGEXP,
    USER,
    CATEGORY,
    PRODUCT,
}