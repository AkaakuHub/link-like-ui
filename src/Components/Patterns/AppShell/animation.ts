export const homeMenuOpenAnimationDurationMs = 200;
export const homeMenuCloseAnimationDurationMs = 600;
export const homeMenuOpenAnimationDurationCssVar =
	"--ll-home-menu-open-animation-duration";
export const homeMenuCloseAnimationDurationCssVar =
	"--ll-home-menu-close-animation-duration";

// Keep animation class names static so Tailwind can always generate them.
export const homeMenuEnterAnimationClass =
	"animate-[llHomeMenuEnter_var(--ll-home-menu-open-animation-duration)_cubic-bezier(0.2,0.8,0.2,1)_both]";

export const homeMenuExitAnimationClass =
	"animate-[llHomeMenuExit_var(--ll-home-menu-close-animation-duration)_cubic-bezier(0.4,0,0.2,1)_both]";

export const homeMenuScrimInAnimationClass =
	"animate-[llHomeMenuScrimIn_var(--ll-home-menu-open-animation-duration)_ease-out_both]";

export const homeMenuScrimOutAnimationClass =
	"animate-[llHomeMenuScrimOut_var(--ll-home-menu-close-animation-duration)_ease-out_both]";
