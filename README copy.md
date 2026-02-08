# flappyBirdWeb
Flappy Bird
# 🐦 Flappy Bird Pro - OOP & PWA Edition

> Một phiên bản nâng cấp của Flappy Bird cổ điển, được viết bằng **JavaScript thuần (Vanilla JS)** theo mô hình **Lập trình hướng đối tượng (OOP)**, hỗ trợ chơi **Offline** (PWA).

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Language](https://img.shields.io/badge/Language-JavaScript%20ES6-blue)
![Style](https://img.shields.io/badge/Style-OOP-green)

## 📖 Giới thiệu (Introduction)

Dự án này là một web game được xây dựng từ con số 0 (không dùng Game Engine) nhằm mục đích thực hành kỹ thuật lập trình hướng đối tượng (OOP) trong JavaScript và công nghệ Progressive Web App (PWA).

Game được thiết kế để có đồ họa mượt mà (60fps), hiệu ứng chiều sâu (Parallax Scrolling) và đặc biệt là khả năng **chơi khi mất mạng** (giống game Khủng long của Chrome).

## 🌟 Tính năng nổi bật (Key Features)

-   **🎮 Gameplay mượt mà:** Sử dụng HTML5 Canvas để render đồ họa tối ưu.
-   **⚡ Offline Mode (PWA):** Tích hợp Service Worker để cache tài nguyên, cho phép chơi game ngay cả khi ngắt kết nối internet.
-   **🎨 Parallax Scrolling:** Hiệu ứng nền di chuyển đa lớp (mây trôi chậm, núi trôi vừa, đất trôi nhanh) tạo cảm giác 3D sống động.
-   **💾 High Score System:** Tự động lưu điểm cao nhất vào LocalStorage của trình duyệt.
-   **📱 Responsive:** Tương thích tốt trên cả Desktop và Mobile (Touch control).
-   **💥 Particle System:** Hiệu ứng hạt nổ tung khi va chạm (đang phát triển).

## 🛠 Công nghệ sử dụng (Tech Stack)

* **Core:** HTML5, CSS3.
* **Logic:** JavaScript (ES6+ Classes).
* **Rendering:** HTML5 Canvas API.
* **PWA:** Service Worker, Manifest.json.
* **Design Pattern:** Object-Oriented Programming (OOP), Game Loop Pattern.

 🏗 Kiến trúc & Đối tượng (Architecture & Objects)

Dự án áp dụng triệt để tư duy OOP. Dưới đây là mô tả các Class (Đối tượng) chính trong source code:

 1. `Game` (Class quản lý chính)
-   **Vai trò:** Khởi tạo canvas, chứa vòng lặp game (`gameLoop`), quản lý trạng thái (Start, Playing, GameOver) và xử lý điểm số.
-   **Nhiệm vụ:** Gọi phương thức `update()` và `draw()` của tất cả các đối tượng con.

 2. `Entity` (Class cha)
-   **Vai trò:** Lớp cơ sở cho mọi vật thể trong game (Chim, Ống, Nền).
-   **Thuộc tính:** `x`, `y`, `width`, `height`.
-   **Phương thức:** `draw()`, `update()`.

 3. `Bird` (Kế thừa `Entity`)
-   **Vai trò:** Nhân vật chính.
-   **Vật lý:** Xử lý trọng lực (`gravity`), vận tốc rơi (`velocity`) và lực nhảy (`jump`).
-   **Logic:** Xử lý va chạm (`checkCollision`) với ống cống hoặc đất, xử lý hoạt ảnh xoay đầu chim.

 4. `PipeManager` & `Pipe` (Kế thừa `Entity`)
-   **Vai trò:** Quản lý các chướng ngại vật.
-   **Logic:** Sinh ra các cặp ống (trên/dưới) ngẫu nhiên độ cao, di chuyển từ phải sang trái, xóa ống khi ra khỏi màn hình để giải phóng bộ nhớ (Object Pooling).

 5. `BackgroundLayer` (Kế thừa `Entity`)
-   **Vai trò:** Tạo hiệu ứng Parallax.
-   **Logic:** Quản lý các lớp nền riêng biệt (Bầu trời, Núi, Cây cối). Mỗi lớp có tốc độ di chuyển (`speedModifier`) khác nhau tạo chiều sâu.

6. `AssetLoader`
-   **Vai trò:** Tải trước (Preload) hình ảnh và âm thanh để đảm bảo game không bị giật lag khi đang chơi.

 📂 Cấu trúc thư mục (Project Structure)

```text
flappy-bird-pro/
├── assets/                 # Chứa tài nguyên game
│   ├── images/             # Ảnh (sprite.png, background.png...)
│   └── sounds/             # Âm thanh (jump.mp3, hit.mp3...)
├── src/                    # Source code JS
│   ├── entities/           # Chứa các class đối tượng
│   │   ├── Bird.js
│   │   ├── Pipe.js
│   │   └── Background.js
│   ├── core/               # Chứa logic cốt lõi
│   │   ├── Game.js
│   │   └── InputHandler.js
│   └── utils/              # Các hàm tiện ích (Math, Collision)
├── index.html              # File chính
├── style.css               # Style giao diện (UI)
├── script.js               # Entry point (Khởi chạy game)
├── sw.js                   # Service Worker (Xử lý Offline)
├── manifest.json           # Cấu hình cài đặt App (PWA)
└── README.md               # Tài liệu dự án
