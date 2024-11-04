
export const constants = {
    PATTERN_EMAIL: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    KEY_TOKEN: 'token',
    KEY_REFRESH_TOKEN: 'refresh_token',
}

export const messages = {
    INVALID_FORM: 'Verifique sus datos',
    EMAIL: {
        REQUIRED: 'El email es requerido',
        INVALID_PATTERN: 'El email no es válido'
    },
    PASSWORD: {
        REQUIRED: 'La contraseña es requerida'
    },
    LOGIN: {
        ERROR_NOT_FOUND: 'Usuario no encontrado',
        ERROR_UNAUTHORIZED: 'Verifique sus credenciales',
        ERROR_GENERIC: 'Error en el login, intente nuevamente'
    },
}