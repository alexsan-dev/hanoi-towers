export interface Strings {
    es: Es;
}

export interface Es {
    home:         Home;
    login:        Login;
    loginBtn:     string;
    welcome:      Login;
    startGame:    Login;
    welcomeBtns:  WelcomeBtns;
    logout:       string;
    initPrompt:   Prompt;
    joinPrompt:   Prompt;
    promptFields: PromptFields;
}

export interface Home {
    title:       string;
    description: string;
    install:     string;
}

export interface Prompt {
    title:       string;
    confirmText: string;
    body:        string;
}

export interface Login {
    title: string;
    body:  string;
}

export interface PromptFields {
    title:     string;
    titleHelp: string;
    disk:      string;
    link:      string;
    linkHelp:  string;
    diskHelp:  string;
}

export interface WelcomeBtns {
    create: string;
    join:   string;
}
