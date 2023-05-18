export type CallbackFunction<T> = (data: T) => void;

export type Action= {
    type: string;
    payload?: any;
}

export type User = {
    _id: string;
    _type: string;
    name: string;
    image: string;
    token?: string;
}

export type PublishResultParams = {
    result: any[];
    username: string | null;
    attempts: number;
    points: number;
    achieved: 'Passed' | 'Failed';
}

export type FormData = {
    email: string;
    password: string;
}

export type SignUpData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type DecodedToken = {
    name: string;
    picture: string;
    sub: string;
}

export type FetchQuestionState = {
    isLoading: boolean;
    apiData: {
        questions: Question[];
        answers: Answer[];
    };
    serverError: Error | null;
}

export type SetFetchQuestionState = React.Dispatch<React.SetStateAction<FetchQuestionState>>;

export type Question = {
    id: string;
    question: string;
    options: string[];
}

export type Answer = {
    id: string;
    answer: string;
}

export type ServerResponse = {
    data: {
        questions: Question[];
        answers: Answer[];
    };
}

export type QuestionProps = {
    onChecked: (i: React.SetStateAction<React.Key | undefined | null>)=>void;
}

export type QuizProps = {
    onChecked: (i: React.SetStateAction<React.Key | undefined | null>)=>void;
}

export type TableData = {
    username: string;
    attempts: number;
    points: number;
    achieved: 'Passed' | 'Failed';
}