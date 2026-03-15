interface IconComponentConfig {
    iconName: string;
    containerColor?: string;
    containerWidth?: number;
    containerHeight?: number;
    iconSize?: number;
}

interface ButtonComponentConfig {
    buttonText?: string;
    buttonIcon: string;
    buttonColor?: string;
    buttonAction?: () => void;
}

interface DialogComponentConfig {
    dialogHeaderTitle?: string;
    dialogContentTitle?: string;
    dialogContentSubtitle?: string;
}

export type { 
    IconComponentConfig,
    ButtonComponentConfig,
    DialogComponentConfig 
}