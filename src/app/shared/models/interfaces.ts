interface IconComponentConfig {
    iconName: string;
    iconColor?: string;
    containerColor?: string;
    containerWidth?: number;
    containerHeight?: number;
    iconSize?: number;
}

interface ButtonComponentConfig {
    buttonText?: string;
    buttonIcon?: string;
    buttonIconColor?: string;
    buttonColor?: string;
    buttonBorder?: string;
    buttonAction: () => void;
}

interface DialogComponentConfig {
    dialogHeaderTitle?: string;
    dialogContentTitle?: string;
    dialogContentSubtitle?: string;
}

interface InputComponentConfig {
    inputHeaderIcon?: string;
    inputHeaderIconColor?: string;
    inputHeaderText?: string;
    inputContentIcon?: string;
    inputContentIconColor?: string;
    inputContentPlaceholder: string;
    inputContentType: string;
}

interface CardComponentConfig {
    cardTitle?: string;
    cardSubtitle?: string | number;
    cardBackground?: string;
    cardBorder?: string;
}

export type { 
    IconComponentConfig,
    ButtonComponentConfig,
    DialogComponentConfig,
    InputComponentConfig,
    CardComponentConfig
}