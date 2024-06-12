// GlobalStyle.js
import {createGlobalStyle} from 'styled-components';
import './assets/fonts/Pretendard-Black.otf';
import './assets/fonts/Pretendard-Bold.otf';
import './assets/fonts/Pretendard-ExtraBold.otf';
import './assets/fonts/Pretendard-ExtraLight.otf';
import './assets/fonts/Pretendard-Light.otf';
import './assets/fonts/Pretendard-Medium.otf';
import './assets/fonts/Pretendard-Regular.otf';
import './assets/fonts/Pretendard-SemiBold.otf';
import './assets/fonts/Pretendard-Thin.otf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-Black.otf') format('opentype');
        font-weight: 900;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-Bold.otf') format('opentype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-ExtraBold.otf') format('opentype');
        font-weight: 800;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-ExtraLight.otf') format('opentype');
        font-weight: 200;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-Light.otf') format('opentype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-Medium.otf') format('opentype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-Regular.otf') format('opentype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-SemiBold.otf') format('opentype');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/font/Pretendard-Thin.otf') format('opentype');
        font-weight: 100;
        font-style: normal;
    }

    html, body, * {
        font-family: 'Pretendard', sans-serif;
        margin: 0; /* 모든 요소의 기본 마진을 0으로 설정 */
        padding: 0; /* 모든 요소의 기본 패딩을 0으로 설정 */
    }

    body {
        line-height: 200%;
    }

    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    button,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }

    body {
        line-height: 1;
    }

    ol,
    ul {
        list-style: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`;

export default GlobalStyle;
