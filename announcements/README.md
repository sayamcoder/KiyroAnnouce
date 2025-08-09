# Pterodactyl Announcement System Blueprint

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Pterodactyl](https://img.shields.io/badge/Pterodactyl-1.x-brightgreen.svg)

A powerful, lightweight, and easy-to-install announcement system for the Pterodactyl Panel, built for the Blueprint extension.

This blueprint allows administrators to create and manage panel-wide announcements that are beautifully displayed to all users on their dashboard.

---

## ✨ Key Features

-   **🔧 Admin Management Panel:** A dedicated page in the Admin Area to easily Create, View, and Delete announcements.
-   **🎨 User-Facing Display:** Announcements appear cleanly on the user dashboard, with different colors for `Info`, `Warning`, and `Danger` types.
-   **🚀 Lightweight & Fast:** Built with NodeJS and Express. It uses a simple JSON file for data storage, so **no database is required!**
-   **🔌 Easy Installation:** Get up and running in under a minute with a single `git clone` command.
-   **🎨 Customizable:** Built with standard React and TypeScript, making it easy for developers to customize the look and feel.

---

## 📸 Screenshots

<details>
<summary><strong>Click to view screenshots</strong></summary>
<br>

| Admin Management Page | User Dashboard View |
| :---: | :---: |
| *Replace with your admin page screenshot* | *Replace with your user dashboard screenshot* |
| ![Admin Page](https://via.placeholder.com/400x250.png/1f2937/d1d5db?text=Admin+Management+UI) | ![User Dashboard](https://via.placeholder.com/400x250.png/1f2937/d1d5db?text=User+Dashboard+View) |

</details>

---

## 📋 Prerequisites

Before you begin, ensure you have the following:
1.  A running Pterodactyl Panel (`1.x`).
2.  The **[Blueprint Extension](https://blueprint.zip/)** installed and enabled on your panel.

---

## ⚙️ Installation

Installing this blueprint is incredibly simple.

1.  SSH into your server and navigate to the Pterodactyl extensions directory:
    ```bash
    cd /var/www/pterodactyl/extensions
    ```

2.  Clone this repository. This will create a new `announcements` folder with all the necessary files.
    ```bash
    git clone https://github.com/sayamcoder/KiyroAnnouce
    ```

3.  Set the correct ownership for the new directory. The webserver user (`www-data` for Ubuntu/Debian, `nginx` for CentOS) needs to own the files.
    ```bash
    chown -R www-data:www-data announcements
    ```

4.  That's it! Go to your **Pterodactyl Admin Area -> Blueprint** page. The "Announcement System" will appear in the list. Click **Enable**.

Blueprint will handle the rest, including installing NodeJS dependencies.

---

## 💡 How to Use

-   **To create an announcement:** Navigate to `Admin Area -> Announcements` in your Pterodactyl Panel sidebar.
-   **To view announcements:** Simply visit the main dashboard (`/`) of your panel.

---
