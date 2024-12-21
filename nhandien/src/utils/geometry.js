/**
 * Tính góc giữa ba điểm
 * @param {Array} p1 Điểm thứ nhất [x, y]
 * @param {Array} p2 Điểm thứ hai [x, y]
 * @param {Array} p3 Điểm thứ ba [x, y]
 * @returns {number} Góc tính bằng độ
 */
export function calculateAngle(p1, p2, p3) {
    const vector1 = { x: p1[0] - p2[0], y: p1[1] - p2[1] };
    const vector2 = { x: p3[0] - p2[0], y: p3[1] - p2[1] };

    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;

    const angle = Math.atan2(crossProduct, dotProduct);
    return Math.abs(angle * 180 / Math.PI);
}