import styled from "styled-components";

const Wrapper = styled.section`

    nav {
        width: var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }
    .logo{
        width: 200px;
    }
    .page {
        min-height: calc(102vh - var(--nav-height));
        display: grid;
        align-items: center;
        margin-top: -3rem;
    }
    h1 {
        font-weight: 700;
        margin-bottom: 1.5rem;
    }
    p {
        line-height: 2;
        color: var(--text-secondary-color);
        margin-bottom: 1.5rem;
    }
    .register-link {
        margin-right: 1rem;
    }
    .main-img {
        display: none;
    }
    .btn {
        padding: 0.75rem 1rem
    }
    footer {
        text-align: center;
        margin-bottom: 1rem;
        a {
            color: var(--text-color)
        }
    }
    @media (min-width: 992px) {
        .page {
            grid-template-columns: 1fr 400px;
            column-gap: 3rem
        }
        .main-img {
            display: block;
        }
    }
`

export default Wrapper;