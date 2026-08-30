import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const NAV_ITEMS = [
	{ title: "Home", to: "/" },
	{ title: "Research", to: "/research" },
	{ title: "Projects", to: "/projects" },
	{ title: "Academics", to: "/academics" },
	{ title: "Timeline", to: "/updates" },
	{ title: "Photography", to: "/photography" },
	{ title: "Contact", to: "/mail" },
];

const HeaderMenu = () => {
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolledPast, setScrolledPast] = useState(false);
	const [sectionTitle, setSectionTitle] = useState("");
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [indicatorStyle, setIndicatorStyle] = useState({
		top: 0,
		height: 0,
		opacity: 0,
	});

	const navRef = useRef(null);
	const linkRefs = useRef([]);

	// Close mobile menu and reset scroll state on route changes
	useEffect(() => {
		setMobileOpen(false);
		setScrolledPast(false);
	}, [location.pathname]);

	// Observe when the page's section title (h2) scrolls out of view
	useEffect(() => {
		let observer;
		const timer = setTimeout(() => {
			const h2 = document.querySelector("#content h2");
			if (!h2) return;

			setSectionTitle(h2.textContent || "");

			observer = new IntersectionObserver(
				([entry]) => {
					setScrolledPast(!entry.isIntersecting);
				},
				{ threshold: 0 }
			);

			observer.observe(h2);
		}, 60);

		return () => {
			clearTimeout(timer);
			if (observer) observer.disconnect();
		};
	}, [location.pathname]);

	// Prevent background scroll when mobile menu is open
	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const updateIndicator = useCallback(() => {
		if (!navRef.current || window.innerWidth < 1080) return;
		const activeIdx = NAV_ITEMS.findIndex((item) => {
			if (item.to === "/") return location.pathname === "/";
			return location.pathname.startsWith(item.to);
		});

		const activeEl = linkRefs.current[activeIdx];
		if (activeEl && navRef.current) {
			const navRect = navRef.current.getBoundingClientRect();
			const linkRect = activeEl.getBoundingClientRect();

			setIndicatorStyle({
				top: linkRect.top - navRect.top,
				height: linkRect.height,
				opacity: 1,
			});
		} else {
			setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
		}
	}, [location.pathname]);

	useEffect(() => {
		updateIndicator();
		const timer = setTimeout(updateIndicator, 50);
		return () => clearTimeout(timer);
	}, [updateIndicator, location.pathname]);

	useEffect(() => {
		window.addEventListener("resize", updateIndicator);
		return () => window.removeEventListener("resize", updateIndicator);
	}, [updateIndicator]);

	const isScrolledBar = scrolledPast && !mobileOpen;

	// Detect when a fullscreen MUI Dialog (lightbox) is open
	useEffect(() => {
		const checkLightbox = () => {
			const dialog = document.querySelector(".MuiDialog-root");
			setLightboxOpen(!!dialog);
		};

		const observer = new MutationObserver(checkLightbox);
		observer.observe(document.body, { childList: true, subtree: true });
		checkLightbox();

		return () => observer.disconnect();
	}, []);

	return (
		<div id="menu-container" className={mobileOpen ? "drawer-open" : ""}>
			{/* Floating hamburger button that morphs into section title bar on scroll */}
			{!lightboxOpen && (
				<button
					type="button"
					className={`mobile-hamburger-btn ${mobileOpen ? "open" : ""} ${isScrolledBar ? "scrolled" : ""}`}
					onClick={() => setMobileOpen((prev) => !prev)}
					aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
					aria-expanded={mobileOpen}
				>
					<span className="hamburger-name">{sectionTitle}</span>
					{mobileOpen ? (
						<CloseIcon sx={{ fontSize: 24, color: "var(--text-color)" }} />
					) : (
						<MenuIcon sx={{ fontSize: 24, color: "var(--text-color)" }} />
					)}
				</button>
			)}

			{/* Fullscreen Overlay Menu */}
			<div className={`langchain-fullscreen-overlay ${mobileOpen ? "open" : ""}`}>
				<div className="langchain-overlay-container">
					<div className="langchain-nav-list">
						{NAV_ITEMS.map((item, idx) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) => `langchain-nav-link ${isActive ? "active" : ""}`}
								end={item.to === "/"}
								onClick={() => setMobileOpen(false)}
								style={{ "--item-idx": idx }}
							>
								<span>{item.title}</span>
							</NavLink>
						))}
					</div>
				</div>
			</div>

			{/* Desktop Sidebar Navigation */}
			<nav id="menu" ref={navRef} aria-label="Main Navigation">
				{NAV_ITEMS.map((item, idx) => (
					<NavLink
						key={item.to}
						to={item.to}
						ref={(el) => {
							linkRefs.current[idx] = el;
						}}
						className={({ isActive }) => (isActive ? "active" : "")}
						end={item.to === "/"}
					>
						{item.title}
					</NavLink>
				))}
				<span
					className="nav-sliding-indicator"
					style={{
						top: `${indicatorStyle.top}px`,
						height: `${indicatorStyle.height}px`,
						opacity: indicatorStyle.opacity,
					}}
				/>
			</nav>
		</div>
	);
};

export default HeaderMenu;
