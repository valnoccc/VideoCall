// Nếu bạn cài qua npm thì dùng dòng này:
import LibGenerateTestUserSig from 'lib-generate-test-usersig-es';
// Nếu bạn có file .min.js nằm ngay cạnh file này thì giữ nguyên dòng của bạn:
// import LibGenerateTestUserSig from './lib-generate-test-usersig-es.min.js';

/**
 * Lấy cấu hình từ biến môi trường (File .env hoặc Netlify Config)
 */
const ENV_SDKAPPID = Number(import.meta.env.VITE_SDKAPPID) || 0;
const ENV_SECRETKEY = import.meta.env.VITE_SECRETKEY || "";
const EXPIRETIME = 604800;

export function genTestUserSig(params) {
  // Logic: Ưu tiên lấy từ params truyền vào, nếu không có thì lấy từ biến môi trường
  const sdkAppId = params.SDKAppID || ENV_SDKAPPID;
  const secretKey = params.SecretKey || ENV_SECRETKEY;

  // Kiểm tra xem đã có Key chưa
  if (sdkAppId === 0 || secretKey === '') {
    alert('Thiếu SDKAppID hoặc SecretKey! Kiểm tra lại file .env hoặc cấu hình Netlify.');
    return {
      userSig: '',
      sdkAppId,
    };
  }

  // Tạo UserSig
  const generator = new LibGenerateTestUserSig(sdkAppId, secretKey, EXPIRETIME);
  const userSig = generator.genTestUserSig(params.userID);

  return {
    sdkAppId,
    userSig,
    // Không return secretKey ra ngoài để bảo mật
  };
}

export default genTestUserSig;