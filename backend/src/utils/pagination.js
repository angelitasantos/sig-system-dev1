function getPaginationParams(req) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    return { page, limit, offset };
}

function buildPaginatedResponse(data, total, page, limit) {
    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data,
    };
}

module.exports = {
    getPaginationParams,
    buildPaginatedResponse,
};
