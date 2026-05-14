import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAltwdGZdj6RWKKKvc1cRIXTRA8IIs-5ZE",
  authDomain: "aistoryadventure-8796e.firebaseapp.com",
  projectId: "aistoryadventure-8796e",
  storageBucket: "aistoryadventure-8796e.firebasestorage.app",
  messagingSenderId: "587433707758",
  appId: "1:587433707758:web:2a1a36b90b9948fe7c8bff",
  measurementId: "G-EJW5P4ELFT",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
window.auth = auth;
const provider = new GoogleAuthProvider();

const API_BASE = "http://127.0.0.1:8000";

// ── DOM refs ──────────────────────────────────────────────────────────────────

const loginPage      = document.getElementById("loginPage");
const landingPage    = document.getElementById("landingPage");
const setupPage      = document.getElementById("setupPage");
const gamePage       = document.getElementById("gamePage");
const foundationPage = document.getElementById("foundationPage");
const adminPage      = document.getElementById("adminPage");
const continuePage   = document.getElementById("continuePage");
const registerPage = document.getElementById("registerPage");
const novelWorldPage = document.getElementById("novelWorldPage");
const novelQuestionPage = document.getElementById("novelQuestionPage");
const novelCharacterPage = document.getElementById("novelCharacterPage");

const loginGoogleBtn          = document.getElementById("loginGoogleBtn");
const guestBtn                = document.getElementById("guestBtn");
const logoutBtn               = document.getElementById("logoutBtn");
const goToSetupBtn            = document.getElementById("goToSetup");
const startNovelBtn           = document.getElementById("startNovelBtn");
const continueBtn             = document.getElementById("continueBtn");
const backToLandingBtn        = document.getElementById("backToLanding");
const backToLandingFromContinue = document.getElementById("backToLandingFromContinue");
const rollBtn                 = document.getElementById("rollBtn");
const newGameBtn              = document.getElementById("newGameBtn");

const sessionLabel            = document.getElementById("sessionLabel");
const loadingOverlay          = document.getElementById("loadingOverlay");
const storyLog = document.getElementById("storyLog");
const choicesBox = document.getElementById("choicesBox");
const customAction = document.getElementById("customAction");
const submitBtn = document.getElementById("submitBtn");
const foundationText          = document.getElementById("foundationText");
const backToSetupBtn = document.getElementById("backToSetupBtn");
const beginStoryBtn           = document.getElementById("beginStoryBtn");
const adminBtn                = document.getElementById("adminBtn");
const backToGameBtn           = document.getElementById("backToGameBtn");
const loadMemoryBtn           = document.getElementById("loadMemoryBtn");
const adminTokenInput         = document.getElementById("adminTokenInput");
const adminOutput             = document.getElementById("adminOutput");
const sessionList             = document.getElementById("sessionList");
const playerNameInput = document.getElementById("playerName");
const genderInput = document.getElementById("gender");
const personalityInput = document.getElementById("personality");
const storyStyleInput = document.getElementById("storyStyle");
const novelWorldSeed              = document.getElementById("novelWorldSeed");
const novelInitialTargetWords     = document.getElementById("novelInitialTargetWords");
const createNovelWorldBtn         = document.getElementById("createNovelWorldBtn");
const skipNovelWorldBtn           = document.getElementById("skipNovelWorldBtn");
const backToLandingFromNovelWorld = document.getElementById("backToLandingFromNovelWorld");

const novelQuestionTitle          = document.getElementById("novelQuestionTitle");
const novelQuestionStepLabel = document.getElementById("novelQuestionStepLabel");
const novelQuestionText           = document.getElementById("novelQuestionText");
const novelQuestionAnswer         = document.getElementById("novelQuestionAnswer");
const novelQuestionSuggestions    = document.getElementById("novelQuestionSuggestions");
const novelQuestionBackBtn        = document.getElementById("novelQuestionBackBtn");
const novelQuestionNextBtn        = document.getElementById("novelQuestionNextBtn");

const viewWorldDraftBtn           = document.getElementById("viewWorldDraftBtn");
const worldDraftModal             = document.getElementById("worldDraftModal");
const closeWorldDraftBtn          = document.getElementById("closeWorldDraftBtn");
const worldDraftText              = document.getElementById("worldDraftText");

const backToNovelQuestionsBtn     = document.getElementById("backToNovelQuestionsBtn");
const novelPlayerName             = document.getElementById("novelPlayerName");
const novelGender                 = document.getElementById("novelGender");
const novelAge                    = document.getElementById("novelAge");
const novelOccupation             = document.getElementById("novelOccupation");
const novelPersonality            = document.getElementById("novelPersonality");
const novelFoundationTargetWords  = document.getElementById("novelFoundationTargetWords");
const createNovelFoundationBtn    = document.getElementById("createNovelFoundationBtn");

const turnTargetWords             = document.getElementById("turnTargetWords");

const userBadge      = document.getElementById("userBadge");
const userAvatarImg  = document.getElementById("userAvatarImg");
const userNameLabel  = document.getElementById("userNameLabel");
const userEmailLabel = document.getElementById("userEmailLabel");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginEmailBtn = document.getElementById("loginEmailBtn");

const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerSubmitBtn = document.getElementById("registerSubmitBtn");

const goToRegisterBtn = document.getElementById("goToRegisterBtn");
const goToLoginBtn = document.getElementById("goToLoginBtn");

const registerPasswordConfirm =
  document.getElementById("registerPasswordConfirm");

  const toggleLoginPassword =
  document.getElementById("toggleLoginPassword");

const toggleRegisterPassword =
  document.getElementById("toggleRegisterPassword");

const toggleRegisterPasswordConfirm =
  document.getElementById("toggleRegisterPasswordConfirm");

const authLoadingOverlay =
  document.getElementById("authLoadingOverlay");

const loginError = document.getElementById("loginError");
const registerError = document.getElementById("registerError");

const discoverPage = document.getElementById("discoverPage");
const aboutPage = document.getElementById("aboutPage");

const homeNavBtn = document.getElementById("homeNavBtn");
const homeTabBtn = document.getElementById("homeTabBtn");
const discoverTabBtn = document.getElementById("discoverTabBtn");
const savesTabBtn = document.getElementById("savesTabBtn");
const aboutBtn = document.getElementById("aboutBtn");
const createBtn = document.getElementById("createBtn");

const navAvatarBtn = document.getElementById("navAvatarBtn");
const navAvatar = document.getElementById("navAvatar");
const globalSearchInput = document.getElementById("globalSearchInput");

const creatorWorlds = [
  {
    id: "sunless-realm",
    title: "The Sunless Realm",
    mode: "Adventure",
    description:
      "A cursed kingdom where the sun vanished thirty years ago and every lantern is fed by memory.",
    image:
      "linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.28)), url('./assets/world-sunless-realm.png')",
    worldSeed:
      "Dạ Thành – vương quốc nơi mặt trời không mọc ba mươi năm. Ánh sáng duy nhất từ đèn đốt bằng ký ức con người. Mỗi giờ đèn sáng, một mảnh ký ức cháy. Giàu có trăm đèn, nghèo có một. Trẻ em bị lấy ký ức tuổi thơ để thắp sáng dinh thự. Hội Đồng Đèn gồm bảy lão nhân không còn ký ức nhưng thấy mọi thứ qua đèn của người khác. Lời đồn: có một ngọn đèn vĩnh cửu dưới Khu Không Tên, nuôi bằng ký ức cả một dân tộc đã mất."},
  {
    id: "memory-market",
    title: "The Memory Market",
    mode: "Novel",
    description:
      "A city where memories are bottled, traded, stolen, and used as currency.",
    image:
      "linear-gradient(135deg, rgba(10,12,18,.3), rgba(0,0,0,.7)), url('./assets/world-memory.png')",
    worldSeed:
      "Ở rìa một đế quốc đang mục ruỗng tồn tại Đại Thư Viện Tro Tàn, nơi lưu giữ những cuốn sách ghi lại các tương lai chưa từng xảy ra. Mỗi cuốn sách là một khả thể vỡ vụn: có cuốn kể về ngày đế quốc sụp đổ dưới chân đội quân cỏ dại biết đi, có cuốn tả một triều đại hoàng kim chưa bao giờ bắt đầu, lại có cuốn chỉ vỏn vẹn một câu: 'Ngươi đã chết ở trang kế tiếp.' Sách không được viết bằng mực – chúng được kết tinh từ tro của những sinh vật đã từng mơ thấy tương lai đó. Muốn đọc một cuốn, ngươi phải đốt nó. Khói sẽ cuộn thành hình ảnh, nhưng mỗi lần đốt là một lần tương lai ấy vĩnh viễn biến mất khỏi thế giới khả thể, và một mảnh tro mới rơi xuống nền thư viện. Đại Thư Viện Tro Tàn có kích thước vô định – hành lang cứ dài ra khi ngươi bước, giá sách mọc lên từ sàn đá bazan như rừng cột, và trần nhà cao đến nỗi không ngọn đèn dầu nào chạm tới bóng tối. Ở đây không có ngày đêm, chỉ có những chiếc đèn lồng bằng xương người treo lủng lẳng, thắp sáng bằng mỡ của những kẻ dám ở lại quá lâu. Ai cai quản thư viện? Không ai biết. Nhưng có lưu truyền một thỏa thuận ngầm: mỗi vị khách chỉ được phép đọc đúng một cuốn sách, rồi phải ra đi. Đọc cuốn thứ hai, ngươi sẽ nghe thấy tiếng lật trang từ phía sau cột sách – nhưng không có ai ở đó. Đọc cuốn thứ ba, ngươi sẽ thấy khuôn mặt của chính mình in trên trang trắng, miệng mấp máy những lời chưa từng thốt ra. Và nếu ngươi đọc đến cuốn thứ tư, Đại Thư Viện sẽ giữ ngươi lại – không phải làm thủ thư, mà làm một cuốn sách mới, xếp vào kệ sâu nhất, nơi những tương lai tăm tối nhất nằm chờ. Đế quốc mục ruỗng bên ngoài, người ta đồn rằng có những kẻ lùng sục đến tận rìa đất chỉ để tìm đến Đại Thư Viện. Họ gọi nhau là 'Những Kẻ Mượn Hy Vọng' – những kẻ ngàn năm trước đã đánh mất tương lai thật của mình, nay lang thang từ bản thảo này sang bản thảo khác, cố tìm một cái kết có hậu để cướp lấy làm của riêng. Nhưng sách ở đây không cho phép cướp. Chúng chỉ cho phép cháy. Và tro sau khi đọc rơi xuống sàn, sẽ tự bốc lên xếp thành một cuốn sách mới – nhưng lần này ba dòng đầu tiên luôn là chính xác những gì ngươi vừa trả giá để thấy. Một số học giả điên khùng cho rằng Đại Thư Viện không phải là một tòa nhà, mà là một vết thương trong cấu trúc thời gian. Mỗi lần ai đó đốt một cuốn sách, họ đang cắt đi một nhánh của cây khả thể, và nhánh ấy quay ngược lại đâm vào thực tại, tạo ra những nghịch lý mà đế quốc mục ruỗng kia gọi là 'dịch bệnh ký ức'. Bệnh ấy khiến người ta nhớ về những thứ chưa hề xảy ra: một cuộc hôn nhân chưa từng diễn ra, một cái chết đã xảy ra theo ba cách khác nhau, một người bạn thời thơ ấu chưa từng tồn tại nhưng ai cũng khóc khi nhắc tên. Đế quốc đổ lỗi cho Đại Thư Viện và đã ba lần sai quân đội đến thiêu rụi nó. Cả ba lần, binh lính trở về với khuôn mặt trắng bệch, không nhớ mình đã thấy gì, chỉ lẩm bẩm: 'Chúng tôi đã đốt rất nhiều sách. Nhưng chúng tôi không nhớ nổi chữ nào. Và khi nhìn vào tay nhau, lòng bàn tay mỗi người đều có một vết tro đen hình chữ 'xin lỗi'.' Ngày nay, không ai dám đến gần rìa đế quốc nữa, trừ những kẻ tuyệt vọng nhất – người mất tình yêu, người mất ý nghĩa, và người đã thấy tương lai thật của mình và không thể chịu nổi. Đối với họ, Đại Thư Viện Tro Tàn là khởi đầu và cũng là kết thúc. Bước qua cánh cổng không cánh, họ thì thầm: 'Xin cho tôi một tương lai khác.' Và một cuốn sách bằng tro sẽ từ từ đông đặc trên giá gần nhất, tự mở ra, những trang giấy đen mịn, chữ khói bốc lên, đợi bàn tay run rẩy cầm lấy diêm.",
  },
  {
    id: "ashen-archive",
    title: "The Ashen Archive",
    mode: "Novel",
    description:
      "A forbidden library records futures that have not happened yet.",
    image:
      "linear-gradient(135deg, rgba(10,12,18,.3), rgba(0,0,0,.7)), url('./assets/world-archive.png')",
    worldSeed:
      "Ở rìa một đế quốc đang mục ruỗng tồn tại Đại Thư Viện Tro Tàn, nơi lưu giữ những cuốn sách ghi lại các tương lai chưa từng xảy ra. Mỗi cuốn sách là một khả thể vỡ vụn: có cuốn kể về ngày đế quốc sụp đổ dưới chân đội quân cỏ dại biết đi, có cuốn tả một triều đại hoàng kim chưa bao giờ bắt đầu, lại có cuốn chỉ vỏn vẹn một câu: 'Ngươi đã chết ở trang kế tiếp.' Sách không được viết bằng mực – chúng được kết tinh từ tro của những sinh vật đã từng mơ thấy tương lai đó. Muốn đọc một cuốn, ngươi phải đốt nó. Khói sẽ cuộn thành hình ảnh, nhưng mỗi lần đốt là một lần tương lai ấy vĩnh viễn biến mất khỏi thế giới khả thể, và một mảnh tro mới rơi xuống nền thư viện. Đại Thư Viện Tro Tàn có kích thước vô định – hành lang cứ dài ra khi ngươi bước, giá sách mọc lên từ sàn đá bazan như rừng cột, và trần nhà cao đến nỗi không ngọn đèn dầu nào chạm tới bóng tối. Ở đây không có ngày đêm, chỉ có những chiếc đèn lồng bằng xương người treo lủng lẳng, thắp sáng bằng mỡ của những kẻ dám ở lại quá lâu. Ai cai quản thư viện? Không ai biết. Nhưng có lưu truyền một thỏa thuận ngầm: mỗi vị khách chỉ được phép đọc đúng một cuốn sách, rồi phải ra đi. Đọc cuốn thứ hai, ngươi sẽ nghe thấy tiếng lật trang từ phía sau cột sách – nhưng không có ai ở đó. Đọc cuốn thứ ba, ngươi sẽ thấy khuôn mặt của chính mình in trên trang trắng, miệng mấp máy những lời chưa từng thốt ra. Và nếu ngươi đọc đến cuốn thứ tư, Đại Thư Viện sẽ giữ ngươi lại – không phải làm thủ thư, mà làm một cuốn sách mới, xếp vào kệ sâu nhất, nơi những tương lai tăm tối nhất nằm chờ. Đế quốc mục ruỗng bên ngoài, người ta đồn rằng có những kẻ lùng sục đến tận rìa đất chỉ để tìm đến Đại Thư Viện. Họ gọi nhau là 'Những Kẻ Mượn Hy Vọng' – những kẻ ngàn năm trước đã đánh mất tương lai thật của mình, nay lang thang từ bản thảo này sang bản thảo khác, cố tìm một cái kết có hậu để cướp lấy làm của riêng. Nhưng sách ở đây không cho phép cướp. Chúng chỉ cho phép cháy. Và tro sau khi đọc rơi xuống sàn, sẽ tự bốc lên xếp thành một cuốn sách mới – nhưng lần này ba dòng đầu tiên luôn là chính xác những gì ngươi vừa trả giá để thấy. Một số học giả điên khùng cho rằng Đại Thư Viện không phải là một tòa nhà, mà là một vết thương trong cấu trúc thời gian. Mỗi lần ai đó đốt một cuốn sách, họ đang cắt đi một nhánh của cây khả thể, và nhánh ấy quay ngược lại đâm vào thực tại, tạo ra những nghịch lý mà đế quốc mục ruỗng kia gọi là 'dịch bệnh ký ức'. Bệnh ấy khiến người ta nhớ về những thứ chưa hề xảy ra: một cuộc hôn nhân chưa từng diễn ra, một cái chết đã xảy ra theo ba cách khác nhau, một người bạn thời thơ ấu chưa từng tồn tại nhưng ai cũng khóc khi nhắc tên. Đế quốc đổ lỗi cho Đại Thư Viện và đã ba lần sai quân đội đến thiêu rụi nó. Cả ba lần, binh lính trở về với khuôn mặt trắng bệch, không nhớ mình đã thấy gì, chỉ lẩm bẩm: 'Chúng tôi đã đốt rất nhiều sách. Nhưng chúng tôi không nhớ nổi chữ nào. Và khi nhìn vào tay nhau, lòng bàn tay mỗi người đều có một vết tro đen hình chữ 'xin lỗi'.' Ngày nay, không ai dám đến gần rìa đế quốc nữa, trừ những kẻ tuyệt vọng nhất – người mất tình yêu, người mất ý nghĩa, và người đã thấy tương lai thật của mình và không thể chịu nổi. Đối với họ, Đại Thư Viện Tro Tàn là khởi đầu và cũng là kết thúc. Bước qua cánh cổng không cánh, họ thì thầm: 'Xin cho tôi một tương lai khác.' Và một cuốn sách bằng tro sẽ từ từ đông đặc trên giá gần nhất, tự mở ra, những trang giấy đen mịn, chữ khói bốc lên, đợi bàn tay run rẩy cầm lấy diêm.",
  },
  {
    id: "hollow-sea",
    title: "The Hollow Sea",
    mode: "Adventure",
    description:
      "An ocean without water, filled with drifting ships and voices beneath the sand.",
    image:
      "linear-gradient(135deg, rgba(10,12,18,.3), rgba(0,0,0,.7)), url('./assets/world-hollow-sea.PNG')",
    worldSeed:
      "Biển Rỗng là một đại dương không còn nước, chỉ còn cát đen, xác tàu trôi lơ lửng và những giọng nói vọng lên từ lòng đất. Cát đen nóng bỏng vào ban ngày và lạnh cắt da ban đêm, biết bám chặt lấy bất cứ ai đi chân trần và kéo họ xuống. Những xác tàu đủ loại – từ thuyền buồm cổ đến tàu chiến bọc thép – mọc lên từ cát như bộ xương, một số lơ lửng cách mặt đất vài sải tay nhờ từ trường dị thường. Giọng nói dưới lòng đất có thể là của người thân đã khuất hoặc của chính bạn trong tương lai, và mỗi lần bạn trả lời, chúng lại rõ hơn một chút. Sinh vật bản địa duy nhất là 'bóng cát' – những thực thể vô hình chỉ lộ ra khi đèn lồng bão tắt, và 'dây leo mộng' mọc từ xác chết bên trong tàu đắm, thứ nước nhầy từ dây leo có thể thay thế nước uống nhưng khiến người dùng mơ thấy đáy biển cũ. Nơi trú ẩn cuối cùng của con người là Xác Tàu Song Hỷ – một con tàu bọc đồng nằm nghiêng, được hàn dính bằng tôn và xương cá voi, bên trong có chợ đen, bar và những kẻ săn giọng nói. Phía nam nơi những con tàu mới nhất nằm, cát mỏng dần và lộ ra một vực thẳm tối om, từ đó có mùi muối và tiếng sóng xa xăm – nhưng không ai quay lại được sau khi bước qua mép vực.",
  },
];

const originalsGrid = document.getElementById("originalsGrid");
const novelWorldsGrid = document.getElementById("novelWorldsGrid");

const featuredTitle = document.getElementById("featuredTitle");
const featuredDescription = document.getElementById("featuredDescription");
const featuredStartBtn = document.getElementById("featuredStartBtn");
const heroNextBtn = document.getElementById("heroNextBtn");

const novelWorlds = creatorWorlds.filter((w) => w.mode === "Novel");

const createModeModal =
  document.getElementById("createModeModal");

const closeCreateModalBtn =
  document.getElementById("closeCreateModalBtn");

const createAdventureBtn =
  document.getElementById("createAdventureBtn");

const createNovelBtn =
  document.getElementById("createNovelBtn");

const aboutCreateBtn = document.getElementById("aboutCreateBtn");
const aboutHomeBtn = document.getElementById("aboutHomeBtn");
const aboutFinalCreateBtn = document.getElementById("aboutFinalCreateBtn");

const saveSearchInput = document.getElementById("saveSearchInput");
const saveModeFilter = document.getElementById("saveModeFilter");

const avatarDropdown = document.getElementById("avatarDropdown");

const dropdownAvatar = document.getElementById("dropdownAvatar");
const dropdownUserName = document.getElementById("dropdownUserName");
const dropdownUserEmail = document.getElementById("dropdownUserEmail");

const dropdownSavesBtn = document.getElementById("dropdownSavesBtn");
const dropdownCreateBtn = document.getElementById("dropdownCreateBtn");
const dropdownHomeBtn = document.getElementById("dropdownHomeBtn");
const dropdownLogoutBtn = document.getElementById("dropdownLogoutBtn");

const presetDetailPage = document.getElementById("presetDetailPage");
const presetDetailHero = document.getElementById("presetDetailHero");
const presetDetailMode = document.getElementById("presetDetailMode");
const presetDetailTitle = document.getElementById("presetDetailTitle");
const presetDetailDescription = document.getElementById("presetDetailDescription");
const presetDetailTags = document.getElementById("presetDetailTags");
const presetDetailLore = document.getElementById("presetDetailLore");

const backToHomeFromPreset = document.getElementById("backToHomeFromPreset");
const startPresetWorldBtn = document.getElementById("startPresetWorldBtn");
const previewPresetSeedBtn = document.getElementById("previewPresetSeedBtn");

const adventurePrevBtn = document.getElementById("adventurePrevBtn");
const adventureNextBtn = document.getElementById("adventureNextBtn");
const adventureStepLabel = document.getElementById("adventureStepLabel");

const summaryPlayerName = document.getElementById("summaryPlayerName");
const summaryGender = document.getElementById("summaryGender");
const summaryPersonality = document.getElementById("summaryPersonality");
const summaryStoryStyle = document.getElementById("summaryStoryStyle");
let currentAdventureStep = 0;
const totalAdventureSteps = 5;

const foundationModeBadge = document.getElementById("foundationModeBadge");
const foundationPlayerBadge = document.getElementById("foundationPlayerBadge");
const foundationToneBadge = document.getElementById("foundationToneBadge");

const foundationCharacterName = document.getElementById("foundationCharacterName");
const foundationCharacterGender = document.getElementById("foundationCharacterGender");
const foundationCharacterPersonality = document.getElementById("foundationCharacterPersonality");
const foundationCharacterStyle = document.getElementById("foundationCharacterStyle");

const backToHomeFromGame = document.getElementById("backToHomeFromGame");
const openSavesFromGame = document.getElementById("openSavesFromGame");
const backToLandingFromSetup = document.getElementById("backToLandingFromSetup");

const previewPlayerName = document.getElementById("previewPlayerName");
const previewGender = document.getElementById("previewGender");
const previewPersonality = document.getElementById("previewPersonality");
const previewStoryStyle = document.getElementById("previewStoryStyle");

const adventureProgressItems = document.querySelectorAll(
  "#setupPage .adventure-dossier-progress [data-progress]"
);
let novelSessionId = "";
let novelWorldDraft = "";
let novelQuestions = [];
let novelAnswers = [];
let currentNovelQuestionIndex = 0;
let cachedSessions = [];
let featuredWorldIndex = 0;
let selectedPresetWorld = null;

let pendingOpeningMessage = "";
let pendingChoices = [];
let sessionId = sessionStorage.getItem("session_id") || "";
let isRequesting = false;
let isGuest = false;
let loadingLoreInterval = null;
let worldLoreInterval = null;
let currentSessionMode = "adventure";
if (sessionId) sessionLabel.textContent = sessionId;

// ── Particle canvas ───────────────────────────────────────────────────────────

(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(70, Math.floor((W * H) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -Math.random() * 0.22 - 0.06,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.6 ? "224,173,82" : "155,108,255",
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener("resize", () => { resize(); createParticles(); });
})();

// ── Page navigation ───────────────────────────────────────────────────────────

const ALL_PAGES = [
  loginPage,
  registerPage,
  landingPage,
  presetDetailPage,
  discoverPage,
  aboutPage,
  setupPage,
  novelWorldPage,
  novelQuestionPage,
  novelCharacterPage,
  foundationPage,
  gamePage,
  adminPage,
  continuePage,
].filter(Boolean);

function showPage(page) {
  ALL_PAGES.forEach((p) => {
    p.classList.remove("active");
  });

  if (!page) {
    console.error("showPage received null page");
    return;
  }

  page.classList.add("active");

  document.body.dataset.page = page.id;

  if (page === landingPage) {
    requestAnimationFrame(() => {
      renderHomeWorlds();
      renderFeaturedWorld();
    });
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function setActiveNav(activeBtn) {
  [
    homeTabBtn,
    discoverTabBtn,
    savesTabBtn,
  ].forEach((btn) => {
    btn?.classList.remove("active");
  });

  activeBtn?.classList.add("active");
}

function resetGameInput() {
  if (customAction) {
    customAction.value = "";
  }
}

// ── User UI ───────────────────────────────────────────────────────────────────

function updateUserUI(user) {
  if (user) {
    // Hide login page if currently visible, go to landing
    if (dropdownUserName) {
      dropdownUserName.textContent =
        user.displayName || "Player";
    }

    if (dropdownUserEmail) {
      dropdownUserEmail.textContent =
        user.email || "";
    }

    if (dropdownAvatar) {
      if (user.photoURL) {
        dropdownAvatar.innerHTML =
          `<img src="${user.photoURL}" alt="avatar" />`;
      } else {
        const initials =
          (user.displayName || user.email || "?")[0].toUpperCase();

        dropdownAvatar.innerHTML =
          `<span>${initials}</span>`;
      }
    }
    if (loginPage.classList.contains("active")) {
      showPage(landingPage);
    }
    if (navAvatar) {
      navAvatar.classList.remove("nav-avatar-empty");

      if (user.photoURL) {
        navAvatar.innerHTML = `<img src="${user.photoURL}" alt="avatar" />`;
      } else {
        const initials = (user.displayName || user.email || "?")[0].toUpperCase();
        navAvatar.innerHTML = `<span>${initials}</span>`;
      }
    }

    // Update user badge
    userBadge?.classList.remove("hidden");
    userNameLabel.textContent = user.displayName || "Người dùng";
    userEmailLabel.textContent = user.email || "";

    if (user.photoURL) {
      userAvatarImg.innerHTML = `<img src="${user.photoURL}" alt="avatar" />`;
    } else {
      const initials = (user.displayName || "?")[0].toUpperCase();
      userAvatarImg.innerHTML = `<span>${initials}</span>`;
    }
  } else {
    userBadge?.classList.add("hidden");
    userAvatarImg.innerHTML = "";
        closeAvatarDropdown();

    if (dropdownUserName) {
      dropdownUserName.textContent = "Guest";
    }

    if (dropdownUserEmail) {
      dropdownUserEmail.textContent = "Not signed in";
    }

    if (dropdownAvatar) {
      dropdownAvatar.innerHTML = `<span>?</span>`;
    }
    // Only redirect to login page if not guest
    if (navAvatar) {
      navAvatar.classList.add("nav-avatar-empty");
      navAvatar.innerHTML = `<span>●</span>`;
    }
    if (!isGuest) {
      showPage(loginPage);
    }
  }
}

// ── Loading state ─────────────────────────────────────────────────────────────

function setLoading(isLoading) {
  isRequesting = isLoading;

  if (rollBtn) rollBtn.disabled = isLoading;
  if (submitBtn) submitBtn.disabled = isLoading;
  if (adventureNextBtn) adventureNextBtn.disabled = isLoading;
  if (createNovelWorldBtn) createNovelWorldBtn.disabled = isLoading;
  if (createNovelFoundationBtn) createNovelFoundationBtn.disabled = isLoading;

  loadingOverlay?.classList.toggle("hidden", !isLoading);

  if (isLoading) {
    randomizeWorldLoadingText?.();

    clearInterval(worldLoreInterval);

    worldLoreInterval = setInterval(() => {
      randomizeWorldLoadingText?.();
    }, 2400);
  } else {
    clearInterval(worldLoreInterval);
  }
}

function setTurnLoading(isLoading) {
  isRequesting = isLoading;

  if (customAction) customAction.disabled = isLoading;
  if (submitBtn) submitBtn.disabled = isLoading;

  submitBtn?.classList.toggle("loading", isLoading);

  document
    .querySelectorAll(".choice-btn, .novel-choice-card")
    .forEach((btn) => {
      btn.disabled = isLoading;
    });
}

// ── Story log ─────────────────────────────────────────────────────────────────

function typeMessage(el, text, speed = 13) {
  return new Promise((resolve) => {
    let i = 0;
    el.textContent = "";
    function tick() {
      if (i < text.length) {
        el.textContent += text[i++];
        storyLog.scrollTop = storyLog.scrollHeight;
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    }
    tick();
  });
}

async function addMessage(role, content, animate = false) {
  if (!storyLog) return;

  const isNovel = currentSessionMode === "novel";

  const item = document.createElement("article");

  if (isNovel) {
    item.className =
      role === "user"
        ? "novel-user-direction"
        : "novel-scene";

    if (role === "user") {
      item.innerHTML = `
        <div class="novel-direction-label">Direction</div>
        <p>${escapeHtml(content)}</p>
      `;
    } else {
      const sceneCount =
        storyLog.querySelectorAll(".novel-scene").length + 1;

      item.innerHTML = `
        <div class="novel-scene-label">Scene ${sceneCount}</div>
        <div class="novel-prose">
          ${formatStoryParagraphs(content)}
        </div>
      `;
    }
  } else {
    item.className =
      role === "user"
        ? "message user-message"
        : "message ai-message";

    item.innerHTML = `
      <div class="message-icon">
        ${role === "user" ? "◆" : "✦"}
      </div>
      <div class="message-content">
        ${formatStoryParagraphs(content)}
      </div>
    `;
  }

  storyLog.appendChild(item);

  if (animate) {
    item.classList.add("message-enter");
  }

  item.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

function addChoicesLoading() {
  choicesBox.innerHTML = "";
  const placeholder = document.createElement("div");
  placeholder.className = "choices-loading";
  placeholder.id = "choicesLoading";
  placeholder.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  choicesBox.appendChild(placeholder);
}

function removeChoicesLoading() {
  const el = document.getElementById("choicesLoading");
  if (el) el.remove();
}

function updateScrollFade() {
  if (!storyLog) return;
}
storyLog?.addEventListener("scroll", updateScrollFade);

// ── Auto-resize textarea ──────────────────────────────────────────────────────

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 180) + "px";
}

// ── Ripple ────────────────────────────────────────────────────────────────────

function addRipple(btn, e) {
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.cssText = `left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// ── API helper ────────────────────────────────────────────────────────────────

async function requestJson(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (!isGuest) {
    if (!auth.currentUser) {
      showPage(loginPage);
      throw new Error("Phiên đăng nhập đã hết hạn.");
    }

    const token = await auth.currentUser.getIdToken(true);
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    console.error("API error:", data);

    let message = "Request failed";

    if (typeof data === "string") {
      message = data;
    } else if (data?.detail) {
      message =
        typeof data.detail === "string"
          ? data.detail
          : JSON.stringify(data.detail, null, 2);
    } else if (data?.message) {
      message = data.message;
    } else if (data?.error) {
      message =
        typeof data.error === "string"
          ? data.error
          : JSON.stringify(data.error, null, 2);
    }

    throw new Error(message);
  }

  return data;
}

// ── Ambient pulse ─────────────────────────────────────────────────────────────

function pulseAmbient() {
  document.body?.classList.add("ambient-pulse");

  setTimeout(() => {
    document.body?.classList.remove("ambient-pulse");
  }, 900);
}

// ── Confirm dialog ────────────────────────────────────────────────────────────

function confirmDialog(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `
      <div class="confirm-box">
        <p>${message}</p>
        <div class="confirm-actions">
          <button class="ghost confirm-cancel">Cancel</button>
          <button class="danger-btn confirm-ok">Confirm</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("visible"));
    overlay.querySelector(".confirm-ok").addEventListener("click", () => { overlay.remove(); resolve(true); });
    overlay.querySelector(".confirm-cancel").addEventListener("click", () => { overlay.remove(); resolve(false); });
  });
}

// ── Render choices ────────────────────────────────────────────────────────────

function renderChoicesFromArray(choices = []) {
  if (!choicesBox) return;

  choicesBox.innerHTML = "";

  const isNovel = currentSessionMode === "novel";

  choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.type = "button";

    btn.className = isNovel
      ? "novel-choice-card"
      : "choice-btn";

    btn.innerHTML = `
      <span class="choice-number">${index + 1}</span>
      <span>${escapeHtml(choice)}</span>
    `;

    btn.addEventListener("click", async () => {
      customAction.value = choice;
      await submitAction(choice);
    });

    choicesBox.appendChild(btn);
  });
}

async function submitAction(actionText) {
  const action = String(actionText || customAction?.value || "").trim();

  if (!action || !sessionId || isRequesting) return;

  await addMessage("user", action);

  if (customAction) {
    customAction.value = "";
  }

  try {
    setLoading(true);

    const data = await requestJson(`${API_BASE}/game/turn`, {
      method: "POST",
      body: JSON.stringify({
        session_id: sessionId,
        player_input: action,
        target_words: getNumberValue(turnTargetWords, 600),
      }),
    });

    const message = data.message || data.story || "";
    const choices = data.choices || [];

    await addMessage("ai", message, true);
    renderChoicesFromArray(choices);
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
}

// ── Suggestion chips ──────────────────────────────────────────────────────────

document.querySelectorAll(".suggestion-row").forEach((row) => {
  const targetId = row.dataset.target;
  const input = document.getElementById(targetId);
  row.querySelectorAll(".suggestion-chip").forEach((btn) => {
    btn.addEventListener("click", () => { input.value = btn.textContent.trim(); input.focus(); });
  });
});


// ── Novel flow ───────────────────────────────────────────────────────────────

function getNumberValue(input, fallback = 700) {
  const value = Number(input?.value || fallback);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(Math.max(value, 100), 2000);
}

function applySessionMode(mode = "adventure") {
  currentSessionMode = mode || "adventure";
  document.body.dataset.mode = currentSessionMode;
  updateGameplayModeUI();
}

function resetNovelFlow() {
  novelWorldDraft = "";
  novelQuestions = [];
  novelAnswers = [];
  currentNovelQuestionIndex = 0;

  if (novelWorldSeed) novelWorldSeed.value = "";
  if (novelQuestionAnswer) novelQuestionAnswer.value = "";
  if (worldDraftText) worldDraftText.textContent = "";
}


function renderNovelQuestion() {
  const question = novelQuestions[currentNovelQuestionIndex];

  if (!question) {
    showPage(novelCharacterPage);
    return;
  }

  if (novelQuestionStepLabel) {
    novelQuestionStepLabel.textContent =
      `Step ${currentNovelQuestionIndex + 1} of ${novelQuestions.length}`;
  }

  if (novelQuestionTitle) {
    novelQuestionTitle.textContent = "Shape Your Novel";
  }

  if (novelQuestionText) {
    novelQuestionText.textContent = question.question || "Question";
  }

  if (novelQuestionAnswer) {
    novelQuestionAnswer.value =
      novelAnswers[currentNovelQuestionIndex]?.answer || "";

    setTimeout(() => novelQuestionAnswer.focus(), 80);
  }

  if (novelQuestionSuggestions) {
    novelQuestionSuggestions.innerHTML = "";

    (question.suggestions || []).forEach((suggestion) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "suggestion-chip";
      chip.textContent = suggestion;

      chip.addEventListener("click", () => {
        novelQuestionAnswer.value = suggestion;
        novelQuestionAnswer.focus();
      });

      novelQuestionSuggestions.appendChild(chip);
    });
  }

  if (novelQuestionNextBtn) {
    novelQuestionNextBtn.textContent =
      currentNovelQuestionIndex === novelQuestions.length - 1
        ? "Continue"
        : "Next";
  }

  showPage(novelQuestionPage);
}

function showWorldDraftModal() {
  if (worldDraftText) {
    worldDraftText.textContent = novelWorldDraft || "No world draft yet.";
  }
  worldDraftModal?.classList.remove("hidden");
}

function hideWorldDraftModal() {
  worldDraftModal?.classList.add("hidden");
}

// ══════════════════════════════════════════════ EVENT LISTENERS ══

// Login: Google
loginGoogleBtn?.addEventListener("click", async () => {
  loginGoogleBtn.disabled = true;
  showAuthLoading();
  const loginGoogleText = loginGoogleBtn?.querySelector("span");

    if (loginGoogleText) {
      loginGoogleText.textContent = "Đang đăng nhập...";
    }
  try {
    await Promise.all([
      signInWithPopup(auth, provider),
      sleep(2200),
    ]);
    // onAuthStateChanged handles redirect
  } catch (err) {
    console.error(err);
    loginGoogleBtn.disabled = false;
    hideAuthLoading();
    loginGoogleBtn.querySelector("span").textContent = "Tiếp tục với Google";
    showAuthError(loginError, getFriendlyAuthError(err));
  }
});

// Login: Guest
guestBtn?.addEventListener("click", () => {
  alert("Guest mode đang tạm tắt vì backend hiện yêu cầu Firebase login.");
});

// Logout
logoutBtn?.addEventListener("click", async () => {
  const confirmed = await confirmDialog("Đăng xuất? Bạn sẽ trở về màn hình đăng nhập.");
  if (!confirmed) return;
  try {
    await signOut(auth);
    isGuest = false;
    sessionId = "";
    sessionStorage.removeItem("session_id");
    sessionLabel.textContent = "Not Started Yet";
    storyLog.innerHTML = "";
    choicesBox.innerHTML = "";
    // onAuthStateChanged will call showPage(loginPage)
  } catch (err) {
    console.error(err);
    showAuthError(loginError, getFriendlyAuthError(err));
  }
});

// Landing → Setup
goToSetupBtn?.addEventListener("click", () => {
  openAdventureSetup();
});
function openAdventureSetup() {
  currentAdventureStep = 0;
  applySessionMode("adventure");
  renderAdventureStep();
  showPage(setupPage);
  setActiveNav(null);
}
// Landing → Novel World Setup
startNovelBtn?.addEventListener("click", () => {
  resetNovelFlow();
  applySessionMode("novel");
  showPage(novelWorldPage);
});

backToLandingFromNovelWorld?.addEventListener("click", () => showPage(landingPage));


viewWorldDraftBtn?.addEventListener("click", showWorldDraftModal);
closeWorldDraftBtn?.addEventListener("click", hideWorldDraftModal);
worldDraftModal?.addEventListener("click", (event) => {
  if (event.target === worldDraftModal) hideWorldDraftModal();
});

novelQuestionBackBtn?.addEventListener("click", () => {
  const ok = saveCurrentNovelAnswer();

  if (!ok) return;

  if (currentNovelQuestionIndex <= 0) {
    showPage(novelWorldPage);
    return;
  }

  currentNovelQuestionIndex -= 1;
  renderNovelQuestion();
});


backToNovelQuestionsBtn?.addEventListener("click", () => {
  if (novelQuestions.length) renderNovelQuestion();
  else showPage(novelWorldPage);
});

createNovelFoundationBtn?.addEventListener("click", async () => {
  if (!sessionId) {
    alert("Please create a novel world first.");
    showPage(novelWorldPage);
    return;
  }

  if (isRequesting) return;

  try {
    setLoading(true);
    const targetWords = getNumberValue(novelFoundationTargetWords, 700);

    const data = await requestJson(`${API_BASE}/game/novel/foundation`, {
      method: "POST",
      body: JSON.stringify({
        session_id: sessionId,
        player_name: novelPlayerName?.value.trim() || "The Wanderer",
        gender: novelGender?.value.trim() || null,
        age: novelAge?.value.trim() || null,
        occupation: novelOccupation?.value.trim() || null,
        personality: novelPersonality?.value.trim() || null,
        answers: novelAnswers
        .filter((item) => item?.answer)
        .map((item, index) => ({
          question_id: item.question_id || `q${index + 1}`,
          question: item.question || "",
          answer: item.answer || "",
        })),
        target_words: targetWords,
      }),
    });

    sessionId = data.session_id;
    sessionStorage.setItem("session_id", sessionId);
    sessionLabel.textContent = sessionId;
    applySessionMode("novel");
    if (turnTargetWords) turnTargetWords.value = targetWords;

    pendingOpeningMessage = data.message || "";
    pendingChoices = data.choices || [];
    renderFoundationContent(
  data.foundation_text || data.session?.foundation_text || ""
);
updateFoundationSidebar();

    showPage(foundationPage);
    pulseAmbient();
  } catch (err) {
  console.error(err);
  alert(err.message || String(err));
}
  finally {
    setLoading(false);
  }
});

// Setup → Landing
// Setup → Landing
backToLandingBtn?.addEventListener("click", () => {
  showPage(landingPage);
  setActiveNav(homeTabBtn);
});

backToLandingFromSetup?.addEventListener("click", () => {
  showPage(landingPage);
  setActiveNav(homeTabBtn);
});

// Continue button
continueBtn?.addEventListener("click", async () => {
  showPage(continuePage);
  await loadSessions();
});


// Foundation → Setup
backToSetupBtn?.addEventListener("click", () => {
  if (currentSessionMode === "novel") {
    showPage(novelCharacterPage);
    setActiveNav(null);
    return;
  }

  openAdventureSetup();
});

// Foundation → Game
beginStoryBtn?.addEventListener("click", async () => {
  storyLog.innerHTML = "";
  choicesBox.innerHTML = "";
  applySessionMode(currentSessionMode);
  updateGameplayModeUI();
  showPage(gamePage);
  await addMessage("ai", pendingOpeningMessage, true);
  renderChoicesFromArray(pendingChoices);
  pulseAmbient();
});

// Roll character
async function startAdventureGame() {
  if (!auth.currentUser && !isGuest) {
    showPage(loginPage);
    return;
  }

  if (isRequesting) return;

  try {
    setLoading(true);

    const data = await requestJson(`${API_BASE}/game/start`, {
      method: "POST",
      body: JSON.stringify({
        player_name: playerNameInput?.value.trim() || "The Wanderer",
        gender: genderInput?.value.trim() || null,
        personality: personalityInput?.value.trim() || null,
        story_style: storyStyleInput?.value.trim() || null,
        character_hint: null,
      }),
    });

    sessionId = data.session_id;
    sessionStorage.setItem("session_id", sessionId);

    currentSessionMode = data.session?.mode || "adventure";
    document.body.dataset.mode = currentSessionMode;

    pendingOpeningMessage = data.message || "";
    pendingChoices = data.choices || [];

    if (sessionLabel) {
      sessionLabel.textContent = sessionId;
    }

    if (foundationText) {
      renderFoundationContent(
  data.foundation_text || data.session?.foundation_text || ""
);

updateFoundationSidebar();
    }

    showPage(foundationPage);
    pulseAmbient();

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
}



// New game
newGameBtn?.addEventListener("click", async () => {
  const confirmed = await confirmDialog("Bắt đầu game mới? Tiến trình hiện tại sẽ bị xoá.");
  if (!confirmed) return;

  sessionId = "";
  sessionStorage.removeItem("session_id");

  if (sessionLabel) {
    sessionLabel.textContent = "Not Started Yet";
  }

  applySessionMode("adventure");

  if (storyLog) storyLog.innerHTML = "";
  if (choicesBox) choicesBox.innerHTML = "";
  if (customAction) customAction.value = "";

  showPage(landingPage);
});

// Admin
adminBtn?.addEventListener("click", () => {
  if (!sessionId) { addMessage("error", "Chưa có session để debug memory."); return; }
  showPage(adminPage);
});

backToGameBtn?.addEventListener("click", () => showPage(gamePage));

loadMemoryBtn?.addEventListener("click", async () => {
  if (!sessionId) { adminOutput.textContent = "Chưa có session."; return; }
  const token = adminTokenInput.value.trim();
  try {
    const data = await requestJson(`${API_BASE}/game/${sessionId}/admin/memory`, {
      method: "GET",
      headers: { "X-Admin-Token": token },
    });
    adminOutput.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    adminOutput.textContent = err.message;
  }
});

// Keyboard shortcut


// ── Session helpers ───────────────────────────────────────────────────────────

async function loadSessions() {
  if (!sessionList) return;

  sessionList.innerHTML = `
    <div class="saves-loading glass-panel">
      Loading saved stories...
    </div>
  `;

  try {
    const sessions = await requestJson(`${API_BASE}/game/sessions`);

    cachedSessions = Array.isArray(sessions) ? sessions : [];

    renderSavedSessions();

  } catch (err) {
    sessionList.innerHTML = `
      <div class="saves-empty glass-panel error-state">
        <h3>Could not load saves</h3>
        <p>${err.message}</p>
      </div>
    `;
  }
}

function renderSavedSessions() {
  if (!sessionList) return;

  const query =
    saveSearchInput?.value.trim().toLowerCase() || "";

  const modeFilter =
    saveModeFilter?.value || "all";

  const filtered = cachedSessions.filter((session) => {
    const title = (session.title || "").toLowerCase();
    const preview = (
      session.foundation_text ||
      session.world_summary ||
      session.story_summary ||
      ""
    ).toLowerCase();

    const mode = session.mode || "adventure";

    const matchesSearch =
      !query ||
      title.includes(query) ||
      preview.includes(query);

    const matchesMode =
      modeFilter === "all" || mode === modeFilter;

    return matchesSearch && matchesMode;
  });

  if (!filtered.length) {
    sessionList.innerHTML = `
      <div class="saves-empty glass-panel">
        <h3>No saved stories found</h3>
        <p>
          Start a new Adventure or Novel Mode story, then your saves will appear here.
        </p>
      </div>
    `;
    return;
  }

  sessionList.innerHTML = "";

  filtered.forEach((session) => {
    const card = document.createElement("article");
    card.className = "save-card glass-panel";

    const mode = session.mode || "adventure";
    const modeLabel =
      mode === "novel" ? "Novel" : "Adventure";

    const preview =
      session.foundation_text ||
      session.world_summary ||
      session.story_summary ||
      "No story preview available yet.";

    const updatedAt = session.updated_at
      ? new Date(session.updated_at).toLocaleString()
      : "Unknown";

    card.innerHTML = `
      <div class="save-card-top">
        <span class="save-mode ${mode}">
          ${modeLabel}
        </span>

        <span class="save-date">
          ${updatedAt}
        </span>
      </div>

      <h3>${escapeHtml(session.title || "Untitled Story")}</h3>

      <p>
        ${escapeHtml(preview.slice(0, 220))}
        ${preview.length > 220 ? "..." : ""}
      </p>

      <div class="save-card-actions">
        <button
          type="button"
          class="primary-btn load-session-btn"
        >
          Continue
        </button>

        <button
          type="button"
          class="danger-btn delete-session-btn"
        >
          Delete
        </button>
      </div>
    `;

    card
      .querySelector(".load-session-btn")
      ?.addEventListener("click", () => {
        continueSession(session.session_id);
      });

    card
      .querySelector(".delete-session-btn")
      ?.addEventListener("click", () => {
        deleteSession(session.session_id);
      });

    sessionList.appendChild(card);
  });
}

function renderFoundationContent(text) {
  if (!foundationText) return;

  const safeText = (text || "").trim();

  if (!safeText) {
    foundationText.innerHTML = "<p>No world profile available.</p>";
    return;
  }

  const paragraphs = safeText
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  foundationText.innerHTML = paragraphs
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
}
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
async function continueSession(targetSessionId) {
  try {
    const data = await requestJson(`${API_BASE}/game/${encodeURIComponent(targetSessionId)}`);

    sessionId = targetSessionId;
    sessionStorage.setItem("session_id", sessionId);

    storyLog.innerHTML = "";
    choicesBox.innerHTML = "";

    sessionLabel.textContent = sessionId;

    applySessionMode(data.session?.mode || "adventure");

    if (turnTargetWords) {
      turnTargetWords.value =
        data.session?.target_words ||
        (currentSessionMode === "novel" ? 700 : 600);
    }

    renderFoundationContent(
      data.foundation_text || data.session?.foundation_text || ""
    );
    updateFoundationSidebar();

    showPage(gamePage);

    if (customAction) {
      customAction.value = "";
      customAction.focus();
    }

    const messages = data.messages || [];

    for (const msg of messages) {
      if (msg.role === "system") continue;

      await addMessage(
        msg.role === "user" ? "user" : "ai",
        msg.content
      );
    }

    const lastAiMessage = [...messages]
      .reverse()
      .find((m) => m.role === "ai" && m.choices?.length);

    if (lastAiMessage) {
      renderChoicesFromArray(lastAiMessage.choices);
    } else {
      choicesBox.innerHTML =
        "<p style='color:var(--subtle);padding:8px 4px;font-size:0.86rem'>Save cũ chưa có choices được lưu.</p>";
    }

    pulseAmbient();
  } catch (err) {
    alert(err.message);
  }
}

async function deleteSession(targetSessionId) {
  const confirmed = await confirmDialog("Xóa save này? Dữ liệu story và memory sẽ bị xóa.");
  if (!confirmed) return;
  try {
    await requestJson(`${API_BASE}/game/sessions/${encodeURIComponent(targetSessionId)}`, { method: "DELETE" });
    if (sessionId === targetSessionId) {
      sessionId = "";
      sessionStorage.removeItem("session_id");
      sessionLabel.textContent = "Not Started Yet";
      applySessionMode("adventure");
      storyLog.innerHTML = "";
      choicesBox.innerHTML = "";
if (customAction) {
  customAction.value = "";
}
    }
    await loadSessions();
  } catch (err) {
    alert(err.message);
  }
}

// ── Auth state ────────────────────────────────────────────────────────────────

onAuthStateChanged(auth, (user) => {
  hideAuthLoading();
  updateUserUI(user);

  if (loginGoogleBtn) {
    loginGoogleBtn.disabled = false;

    const span = loginGoogleBtn.querySelector("span");
    if (span) {
      span.textContent = "Tiếp tục với Google";
    }
  }

  if (!user && !isGuest) {
    loadingOverlay.classList.add("hidden");
    clearInterval(worldLoreInterval);
    return;
  }

  if (user) {
    showPage(landingPage);
  }
});

// Initial state: show login until Firebase resolves
showPage(loginPage);

loginEmailBtn?.addEventListener("click", async () => {
  clearAuthError(loginError);
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!email || !password) {
  showAuthError(
    loginError,
    "Vui lòng nhập email và mật khẩu."
  );
  return;
}

  try {
    loginEmailBtn.disabled = true;
    loginEmailBtn.textContent = "Đang đăng nhập...";
    showAuthLoading();
    await Promise.all([
  signInWithEmailAndPassword(auth, email, password),
  sleep(2200),
]);

  } catch (err) {
    console.error(err);
    showAuthError(loginError, getFriendlyAuthError(err));

  } finally {
    loginEmailBtn.disabled = false;
    loginEmailBtn.textContent = "Đăng nhập";
    hideAuthLoading();
  }
});

registerSubmitBtn?.addEventListener("click", async () => {
  clearAuthError(registerError);
  const email = registerEmail.value.trim();
  const password = registerPassword.value.trim();
  const confirmPassword = registerPasswordConfirm.value.trim();
  if (password !== confirmPassword) {
  showAuthError(
    registerError,
    "Mật khẩu nhập lại không khớp."
  );
  return;
}

  if (!email || !password) {
  showAuthError(
    registerError,
    "Vui lòng nhập email và mật khẩu."
  );
  return;
}

  if (password.length < 6) {
  showAuthError(
    registerError,
    "Mật khẩu phải ít nhất 6 ký tự."
  );
  return;
}

  try {
    registerSubmitBtn.disabled = true;
    registerSubmitBtn.textContent = "Đang tạo tài khoản...";
    await Promise.all([
  createUserWithEmailAndPassword(
    auth,
    email,
    password
  ),
  sleep(2200),
]);

    showAuthError(
  registerError,
  "Đăng ký thành công. Đang đăng nhập..."
);

registerError.style.background =
  "rgba(80,255,120,0.12)";

registerError.style.border =
  "1px solid rgba(80,255,120,0.25)";

registerError.style.color = "#b8ffca";
    showPage(landingPage);

  } catch (err) {
    console.error(err);
    showAuthError(registerError, getFriendlyAuthError(err));

  } finally {
    registerSubmitBtn.disabled = false;
    registerSubmitBtn.textContent = "Đăng ký";
    hideAuthLoading();
  }
});

goToRegisterBtn?.addEventListener("click", () => {
  loginPassword.value = "";
  showPage(registerPage);
});

goToLoginBtn?.addEventListener("click", () => {
  registerPassword.value = "";
  showPage(loginPage);
});

function togglePassword(input, button) {
  const isPassword = input.type === "password";

  input.type = isPassword ? "text" : "password";

  button.textContent = isPassword ? "🙈" : "👁";
}

toggleLoginPassword?.addEventListener("click", () => {
  togglePassword(loginPassword, toggleLoginPassword);
});

toggleRegisterPassword?.addEventListener("click", () => {
  togglePassword(registerPassword, toggleRegisterPassword);
});

toggleRegisterPasswordConfirm?.addEventListener("click", () => {
  togglePassword(
    registerPasswordConfirm,
    toggleRegisterPasswordConfirm
  );
});
function showAuthLoading() {

  randomizeLoadingText();

  authLoadingOverlay?.classList.remove("hidden");

  clearInterval(loadingLoreInterval);

  loadingLoreInterval = setInterval(() => {
    randomizeLoadingText();
  }, 2200);
}

function hideAuthLoading() {

  clearInterval(loadingLoreInterval);

  authLoadingOverlay?.classList.add("hidden");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showAuthError(target, message) {
  if (!target) return;

  target.textContent = message;
  target.classList.remove("hidden");
}

function clearAuthError(target) {
  if (!target) return;

  target.textContent = "";
  target.classList.add("hidden");
}

function getFriendlyAuthError(err) {
  const code = err?.code || "";

  if (code.includes("auth/invalid-credential")) {
    return "Email hoặc mật khẩu không đúng, hoặc tài khoản chưa tồn tại.";
  }

  if (code.includes("auth/user-not-found")) {
    return "Tài khoản này chưa tồn tại. Hãy đăng ký trước.";
  }

  if (code.includes("auth/wrong-password")) {
    return "Mật khẩu không đúng.";
  }

  if (code.includes("auth/email-already-in-use")) {
    return "Email này đã được đăng ký. Hãy đăng nhập.";
  }

  if (code.includes("auth/weak-password")) {
    return "Mật khẩu quá yếu. Hãy dùng ít nhất 6 ký tự.";
  }

  if (code.includes("auth/invalid-email")) {
    return "Email không hợp lệ.";
  }

  return "Có lỗi xảy ra. Vui lòng thử lại.";
}


function resetAuthPages() {
  // LOGIN
  if (loginEmail) loginEmail.value = "";
  if (loginPassword) loginPassword.value = "";

  clearAuthError(loginError);

  // REGISTER
  if (registerEmail) registerEmail.value = "";
  if (registerPassword) registerPassword.value = "";
  if (registerPasswordConfirm) {
    registerPasswordConfirm.value = "";
  }

  clearAuthError(registerError);

  // reset password visibility
  if (loginPassword) loginPassword.type = "password";
  if (registerPassword) registerPassword.type = "password";

  if (registerPasswordConfirm) {
    registerPasswordConfirm.type = "password";
  }

  if (toggleLoginPassword) {
    toggleLoginPassword.textContent = "👁";
  }

  if (toggleRegisterPassword) {
    toggleRegisterPassword.textContent = "👁";
  }

  if (toggleRegisterPasswordConfirm) {
    toggleRegisterPasswordConfirm.textContent = "👁";
  }
}

const authLoadingText =
  document.getElementById("authLoadingText");

const loadingLoreTexts = [
  "Connecting to the world of AI Story Adventure...",
  "Forging a new destiny...",
  "Summoning forgotten memories...",
  "Awakening ancient kingdoms...",
  "The AI is weaving your legend...",
  "Shaping a world beyond imagination...",
  "Opening the gates of adventure...",
  "The story is beginning to unfold...",
  "Factions are rising across the realm...",
  "A new fate is being written..."
];

function randomizeLoadingText() {
  if (!authLoadingText) return;

  const randomText =
    loadingLoreTexts[
      Math.floor(Math.random() * loadingLoreTexts.length)
    ];

  authLoadingText.style.opacity = 0;

  setTimeout(() => {
    authLoadingText.textContent = randomText;
    authLoadingText.style.opacity = 1;
  }, 180);
}

const worldLoadingText =
  document.getElementById("worldLoadingText");

const worldLoreTexts = [
  "The AI is weaving together lands, memories, and the fate that awaits you...",
  "Ancient kingdoms are rising from forgotten ashes...",
  "Lost civilizations are being reconstructed...",
  "Factions across the realm are awakening...",
  "Your destiny is taking shape...",
  "The world is remembering its ancient history...",
  "A new legend is about to begin...",
  "Mysteries are forming beyond the horizon...",
  "The threads of fate are intertwining...",
  "The realm is being forged around your choices..."
];

function randomizeWorldLoadingText() {
  if (!worldLoadingText) return;

  const randomText =
    worldLoreTexts[
      Math.floor(Math.random() * worldLoreTexts.length)
    ];

  worldLoadingText.style.opacity = 0;

  setTimeout(() => {
    worldLoadingText.textContent = randomText;
    worldLoadingText.style.opacity = 1;
  }, 180);
}

homeNavBtn?.addEventListener("click", () => {
  showPage(landingPage);
  setActiveNav(homeTabBtn);
});

homeTabBtn?.addEventListener("click", () => {
  showPage(landingPage);
  setActiveNav(homeTabBtn);
});

discoverTabBtn?.addEventListener("click", () => {
  showPage(discoverPage);
  setActiveNav(discoverTabBtn);
});

savesTabBtn?.addEventListener("click", async () => {
  showPage(continuePage);
  setActiveNav(savesTabBtn);
  await loadSessions();
});

aboutBtn?.addEventListener("click", () => {
  showPage(aboutPage);
  setActiveNav(null);
  revealAboutSections();
});

createBtn?.addEventListener("click", () => {
  openCreateModal();
});

navAvatarBtn?.addEventListener("click", (event) => {
  event.stopPropagation();

  if (!auth.currentUser && !isGuest) {
    showPage(loginPage);
    setActiveNav(null);
    return;
  }

  toggleAvatarDropdown();
});

dropdownSavesBtn?.addEventListener("click", async () => {
  closeAvatarDropdown();

  showPage(continuePage);
  setActiveNav(savesTabBtn);

  await loadSessions();
});

dropdownCreateBtn?.addEventListener("click", () => {
  closeAvatarDropdown();
  openCreateModal();
});

dropdownHomeBtn?.addEventListener("click", () => {
  closeAvatarDropdown();

  showPage(landingPage);
  setActiveNav(homeTabBtn);
});

dropdownLogoutBtn?.addEventListener("click", async () => {
  closeAvatarDropdown();

  const confirmed = await confirmDialog(
    "Logout and return to the login screen?"
  );

  if (!confirmed) return;

  try {
    await signOut(auth);

    isGuest = false;
    sessionId = "";
    sessionStorage.removeItem("session_id");

    sessionLabel.textContent = "Not Started Yet";
    storyLog.innerHTML = "";
    choicesBox.innerHTML = "";

  } catch (err) {
    console.error(err);
    showAuthError(loginError, getFriendlyAuthError(err));
  }
});

document.addEventListener("click", (event) => {
  if (!avatarDropdown || avatarDropdown.classList.contains("hidden")) {
    return;
  }

  const menu = document.querySelector(".nav-user-menu");

  if (menu && !menu.contains(event.target)) {
    closeAvatarDropdown();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCreateModal();
    closeAvatarDropdown();
  }
});

function renderWorldCard(world) {
  const card = document.createElement("article");
  card.className = "world-card";
  card.style.setProperty("--card-bg", world.image);

  card.innerHTML = `
    <div class="world-card-content">
      <span class="world-card-mode">${world.mode}</span>
      <h3>${world.title}</h3>
      <p>${world.description}</p>
      <div class="world-card-footer">
        <span>Creator World</span>
        <span>Start →</span>
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    selectCreatorWorld(world);
  });

  return card;
}

function renderHomeWorlds() {
  if (originalsGrid) {
    originalsGrid.innerHTML = "";

    creatorWorlds.forEach((world) => {
      originalsGrid.appendChild(renderWorldCard(world));
    });
  }

  if (novelWorldsGrid) {
    novelWorldsGrid.innerHTML = "";

    novelWorlds.forEach((world) => {
      novelWorldsGrid.appendChild(renderWorldCard(world));
    });
  }

  renderFeaturedWorld();
}

function renderFeaturedWorld() {
  const world = creatorWorlds[featuredWorldIndex];

  if (!world) return;

  if (featuredTitle) {
    featuredTitle.textContent = world.title;
  }

  if (featuredDescription) {
    featuredDescription.textContent = world.description;
  }

  const hero = document.querySelector(".home-hero");
  if (hero) {
    hero.style.setProperty("--featured-bg", world.image);
  }

  const dots = document.querySelectorAll(".hero-dots span");

  dots.forEach((dot, index) => {
    dot.classList.toggle(
      "active",
      index === featuredWorldIndex
    );
  });
}
function selectCreatorWorld(world) {
  selectedPresetWorld = world;

  if (!presetDetailPage) {
    console.error("Missing #presetDetailPage in index.html");
    alert("Missing preset detail page in HTML.");
    return;
  }

  renderPresetDetail(world);
  showPage(presetDetailPage);
  setActiveNav(null);
}

function renderPresetDetail(world) {
  if (!world) return;

  if (presetDetailHero) {
    presetDetailHero.style.setProperty(
      "--preset-detail-bg",
      world.image
    );
  }

  if (presetDetailMode) {
    presetDetailMode.textContent = world.mode || "Story";
    presetDetailMode.className =
      `preset-detail-mode ${(world.mode || "").toLowerCase()}`;
  }

  if (presetDetailTitle) {
    presetDetailTitle.textContent = world.title || "Untitled World";
  }

  if (presetDetailDescription) {
    presetDetailDescription.textContent =
      world.description || "";
  }

  if (presetDetailLore) {
    presetDetailLore.textContent =
      world.longDescription || world.worldSeed || "";
  }

  if (presetDetailTags) {
    presetDetailTags.innerHTML = "";

    const tags = world.tags || [];

    tags.forEach((tag) => {
      const chip = document.createElement("span");
      chip.textContent = tag;
      presetDetailTags.appendChild(chip);
    });
  }
}

startPresetWorldBtn?.addEventListener("click", () => {
  if (!selectedPresetWorld) return;

  if (selectedPresetWorld.mode === "Novel") {
    startNovelFromPreset(selectedPresetWorld);
    return;
  }

  if (selectedPresetWorld.mode === "Adventure") {
    startAdventureFromPreset(selectedPresetWorld);
    return;
  }
});
backToHomeFromPreset?.addEventListener("click", () => {
  showPage(landingPage);
  setActiveNav(homeTabBtn);
});
previewPresetSeedBtn?.addEventListener("click", () => {
  document
    .querySelector(".preset-lore-section")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
});

async function startNovelFromPreset(world) {
  if (!auth.currentUser && !isGuest) {
    showPage(loginPage);
    setActiveNav(null);
    return;
  }

  if (novelWorldSeed) {
  novelWorldSeed.value = world.worldSeed || "";
}

if (novelInitialTargetWords && !novelInitialTargetWords.value) {
  novelInitialTargetWords.value = 700;
}

await createNovelWorld({
  title: world.title,
  worldSeed: world.worldSeed || "",
  targetWords: getNumberValue(novelInitialTargetWords, 700),
});
}

async function createNovelWorld({
  title = "Untitled Novel",
  worldSeed = "",
  targetWords = 700,
} = {}) {
  try {
    setLoading(true);

    const data = await requestJson(`${API_BASE}/game/novel/world`, {
      method: "POST",
      body: JSON.stringify({
        title,
        world_seed: worldSeed,
        target_words: targetWords,
      }),
    });

    novelSessionId = data.session_id;
    sessionId = data.session_id;

    sessionStorage.setItem("session_id", sessionId);

    novelWorldDraft = data.world_draft || "";
    novelQuestions = (data.questions || []).map((question, index) => ({
      ...question,
      question_id:
        question.question_id ||
        question.id ||
        `q${index + 1}`,
    }));
    novelAnswers = [];
    currentNovelQuestionIndex = 0;

    sessionLabel.textContent = sessionId;

    renderNovelQuestion();
    showPage(novelQuestionPage);
    setActiveNav(null);

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
}

createNovelWorldBtn?.addEventListener("click", async () => {
  if (!auth.currentUser && !isGuest) {
    showPage(loginPage);
    return;
  }

  if (isRequesting) return;

  await createNovelWorld({
    title: selectedPresetWorld?.title || "Untitled Novel",
    worldSeed: novelWorldSeed?.value.trim() || "",
    targetWords: getNumberValue(novelInitialTargetWords, 700),
  });
});

skipNovelWorldBtn?.addEventListener("click", async () => {
  if (!auth.currentUser && !isGuest) {
    showPage(loginPage);
    return;
  }

  if (isRequesting) return;

  if (novelWorldSeed) {
    novelWorldSeed.value = "";
  }

  await createNovelWorld({
    title: "Untitled Novel",
    worldSeed: "",
    targetWords: getNumberValue(novelInitialTargetWords, 700),
  });
});


function saveCurrentNovelAnswer() {
  const question = novelQuestions[currentNovelQuestionIndex];

  if (!question) return true;

  const answer = novelQuestionAnswer?.value.trim() || "";

  if (!answer) {
    alert("Please answer this question before continuing.");
    return false;
  }

  novelAnswers[currentNovelQuestionIndex] = {
    question_id:
      question.question_id ||
      question.id ||
      `q${currentNovelQuestionIndex + 1}`,
    question: question.question || question.text || "",
    answer,
  };

  return true;
}

novelQuestionNextBtn?.addEventListener("click", () => {
  if (!novelQuestions.length) return;

  novelAnswers[currentNovelQuestionIndex] = {
    question: novelQuestions[currentNovelQuestionIndex]?.question || "",
    answer: novelQuestionAnswer?.value.trim() || "",
  };

  if (currentNovelQuestionIndex < novelQuestions.length - 1) {
    currentNovelQuestionIndex += 1;
    renderNovelQuestion();
    return;
  }

  showPage(novelCharacterPage);
});

function startAdventureFromPreset(world) {
  if (!auth.currentUser && !isGuest) {
    showPage(loginPage);
    setActiveNav(null);
    return;
  }

  if (storyStyleInput) {
    storyStyleInput.value = world.worldSeed || "";
  }

  applySessionMode("adventure");
  openAdventureSetup();
}
heroNextBtn?.addEventListener("click", () => {
  featuredWorldIndex =
    (featuredWorldIndex + 1) % creatorWorlds.length;

  renderFeaturedWorld();
});

featuredStartBtn?.addEventListener("click", () => {
  const world = creatorWorlds[featuredWorldIndex];

  if (world) {
    selectCreatorWorld(world);
  }
});

closeCreateModalBtn?.addEventListener("click", () => {
  closeCreateModal();
});

createModeModal
  ?.querySelector(".create-modal-backdrop")
  ?.addEventListener("click", () => {
    closeCreateModal();
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCreateModal();
  }
});
document.addEventListener("click", (event) => {
  const chip = event.target.closest(".suggestion-chip");

  if (!chip) return;

  const targetId = chip.dataset.target;
  const target = document.getElementById(targetId);

  if (!target) return;

  target.value = chip.textContent.trim();
  target.focus();

  updateAdventureSummary();
  updateAdventurePreview();
});
createAdventureBtn?.addEventListener("click", () => {
  closeCreateModal();
  openAdventureSetup();
});
createNovelBtn?.addEventListener("click", () => {
  closeCreateModal();

  showPage(novelWorldPage);
  setActiveNav(null);
});

function openCreateModal() {
  createModeModal?.classList.remove("hidden");

  requestAnimationFrame(() => {
    createModeModal?.classList.add("visible");
  });
}

function closeCreateModal() {
  createModeModal?.classList.remove("visible");

  setTimeout(() => {
    createModeModal?.classList.add("hidden");
  }, 180);
}

saveSearchInput?.addEventListener("input", () => {
  renderSavedSessions();
});

saveModeFilter?.addEventListener("change", () => {
  renderSavedSessions();
});

aboutCreateBtn?.addEventListener("click", () => {
  openCreateModal();
});

aboutFinalCreateBtn?.addEventListener("click", () => {
  openCreateModal();
});

aboutHomeBtn?.addEventListener("click", () => {
  showPage(landingPage);
  setActiveNav(homeTabBtn);
});

function revealAboutSections() {
  const sections = document.querySelectorAll(".about-reveal");

  sections.forEach((section, index) => {
    section.classList.remove("visible");

    setTimeout(() => {
      section.classList.add("visible");
    }, index * 120);
  });
}

function openAvatarDropdown() {
  avatarDropdown?.classList.remove("hidden");

  requestAnimationFrame(() => {
    avatarDropdown?.classList.add("visible");
  });
}

function closeAvatarDropdown() {
  avatarDropdown?.classList.remove("visible");

  setTimeout(() => {
    avatarDropdown?.classList.add("hidden");
  }, 160);
}

function toggleAvatarDropdown() {
  if (!avatarDropdown) return;

  if (avatarDropdown.classList.contains("hidden")) {
    openAvatarDropdown();
  } else {
    closeAvatarDropdown();
  }
}

function renderAdventureStep() {
  const steps = document.querySelectorAll(".adventure-step");
  const dots = document.querySelectorAll(".adventure-progress span");
  adventureProgressItems.forEach((item) => {
  item.classList.toggle(
    "active",
    Number(item.dataset.progress) === currentAdventureStep
  );
});

updateAdventurePreview();
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentAdventureStep);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentAdventureStep);
  });

  if (adventureStepLabel) {
    adventureStepLabel.textContent =
      `Step ${currentAdventureStep + 1} of ${totalAdventureSteps}`;
  }

  if (adventurePrevBtn) {
    adventurePrevBtn.style.visibility =
      currentAdventureStep === 0 ? "hidden" : "visible";
  }

  if (adventureNextBtn) {
    adventureNextBtn.textContent =
      currentAdventureStep === totalAdventureSteps - 1
        ? "Start Adventure"
        : "Next";
  }

  updateAdventureSummary();
}

function updateAdventureSummary() {
  if (summaryPlayerName) {
    summaryPlayerName.textContent =
      playerNameInput?.value.trim() || "Unknown";
  }

  if (summaryGender) {
    summaryGender.textContent =
      genderInput?.value.trim() || "AI decides";
  }

  if (summaryPersonality) {
    summaryPersonality.textContent =
      personalityInput?.value.trim() || "AI creates";
  }

  if (summaryStoryStyle) {
    summaryStoryStyle.textContent =
      storyStyleInput?.value.trim() || "AI creates";
  }
}

function validateAdventureStep() {
  if (currentAdventureStep === 0) {
    if (!playerNameInput?.value.trim()) {
      alert("Please enter your character name.");
      return false;
    }
  }

  return true;
}

adventureNextBtn?.addEventListener("click", async () => {
  const ok = validateAdventureStep();

  if (!ok) return;

  if (currentAdventureStep < totalAdventureSteps - 1) {
    currentAdventureStep += 1;
    renderAdventureStep();
    return;
  }

  await startAdventureGame();
});

adventurePrevBtn?.addEventListener("click", () => {
  if (currentAdventureStep <= 0) return;

  currentAdventureStep -= 1;
  renderAdventureStep();
});

function updateFoundationSidebar() {
  if (foundationModeBadge) {
    foundationModeBadge.textContent =
      currentSessionMode === "novel" ? "Novel Mode" : "Adventure Mode";
  }

  if (foundationPlayerBadge) {
    foundationPlayerBadge.textContent =
      playerNameInput?.value.trim() || "Unknown Hero";
  }

  if (foundationToneBadge) {
    foundationToneBadge.textContent = "AI Generated";
  }

  if (foundationCharacterName) {
    foundationCharacterName.textContent =
      playerNameInput?.value.trim() || "Unknown";
  }

  if (foundationCharacterGender) {
    foundationCharacterGender.textContent =
      genderInput?.value.trim() || "AI decides";
  }

  if (foundationCharacterPersonality) {
    foundationCharacterPersonality.textContent =
      personalityInput?.value.trim() || "AI generated";
  }

  if (foundationCharacterStyle) {
    foundationCharacterStyle.textContent =
      storyStyleInput?.value.trim() || "AI generated";
  }
}

backToHomeFromGame?.addEventListener("click", () => {
  showPage(landingPage);
  setActiveNav(homeTabBtn);
});

openSavesFromGame?.addEventListener("click", async () => {
  showPage(continuePage);
  setActiveNav(savesTabBtn);
  await loadSessions();
});

function formatStoryParagraphs(text) {
  const safeText = String(text || "").trim();

  if (!safeText) return "<p></p>";

  return safeText
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
}

function updateGameplayModeUI() {
  const isNovel = currentSessionMode === "novel";

  document.body.dataset.mode = currentSessionMode;

  if (customAction) {
    customAction.placeholder = isNovel
      ? "Write your own direction for the next scene..."
      : "What do you do?";
  }

  const heading = document.querySelector(".choice-panel-heading h3");

  if (heading) {
    heading.textContent = isNovel
      ? "Choose where the story goes next"
      : "Choose your next action";
  }
}

submitBtn?.addEventListener("click", async () => {
  await submitAction();
});

customAction?.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    await submitAction();
  }
});

document.addEventListener(
  "click",
  (event) => {
    const setupBackBtn = event.target.closest("#backToLandingFromSetup");

    if (!setupBackBtn) return;

    event.preventDefault();
    event.stopPropagation();

    currentAdventureStep = 0;

    if (typeof closeCreateModal === "function") {
      closeCreateModal();
    }

    showPage(landingPage);

    if (typeof setActiveNav === "function") {
      setActiveNav(homeTabBtn);
    }
  },
  true
);

function updateAdventurePreview() {
  if (previewPlayerName) {
    previewPlayerName.textContent =
      playerNameInput?.value.trim() || "Waiting...";
  }

  if (previewGender) {
    previewGender.textContent =
      genderInput?.value.trim() || "AI decides";
  }

  if (previewPersonality) {
    previewPersonality.textContent =
      personalityInput?.value.trim() || "Not defined";
  }

  if (previewStoryStyle) {
    previewStoryStyle.textContent =
      storyStyleInput?.value.trim() || "Not defined";
  }
}

[playerNameInput, genderInput, personalityInput, storyStyleInput].forEach(
  (input) => {
    input?.addEventListener("input", () => {
      updateAdventureSummary();
      updateAdventurePreview();
    });
  }
);