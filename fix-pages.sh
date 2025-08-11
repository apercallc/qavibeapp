#!/bin/bash

# Quick fix to restore navigation to all pages
BASIC_NAV='<!-- Basic Navigation -->
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-brand">
            <a href="./index.html" style="text-decoration: none; color: inherit;">
                <h2>QAVibe</h2>
            </a>
        </div>
        <div class="nav-menu" id="nav-menu">
            <a href="./index.html" class="nav-link">Home</a>
            <a href="./index.html#products" class="nav-link">Products</a>
            <a href="./index.html#support" class="nav-link">Support</a>
            <a href="./blog.html" class="nav-link">Blog</a>
            <button class="demo-btn" onclick="openDemoModal()">Get a Demo</button>
        </div>
        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>'

echo "This script would restore basic navigation to all pages"
echo "Currently just showing the structure that would be added"
