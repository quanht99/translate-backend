exports.buildSuccess = ({data}) => {
    if (!data) {
        throw new Error('Missing data');
    }

    return {
        success: true,
        code: 10,
        data
    };
};

exports.buildFailure = ({code, reason}) => ({
    success: false,
    code: code || 21,
    reason: reason || "Đã có lỗi xảy ra"
});

exports.buildUnauthorized = () => ({
    success: false,
    code: 22,
    reason: 'unauthorized'
});

exports.buildWarning = ({code, data, warning}) => {
    if(!data){
        throw new Error("Missing data")
    }
    return {
        success: true,
        code: code || 23,
        data,
        warning
    };
};