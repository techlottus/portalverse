import { useEffect, useState } from "react"
import PersonalData from "@/forms/steps/PersonalData";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { FormConfig } from "@/forms/fixtures/openform"
import AcademicData from "@/forms/steps/AcademicData";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

const getBusinessLineToFetchFrom = (businessLine: string, modality: string) => {
    switch (businessLine) {
        case "UANE": {
            switch (modality) {
                case "Presencial": return "UANE";
                case "Flex": return "ULA";
                case "Online": return "UANE,ULA";
                default: return "UANE"
            }
        }
        case "UTEG": {
            switch (modality) {
                case "Presencial": return "UTEG";
                case "Flex": return "ULA";
                case "Online": return "ULA";
                default: return "UTEG"
            }
        }
        case "ULA": {
            return "ULA"
        }
        case "UTC": {
            switch (modality) {
                case "Presencial": return "UTC";
                case "Semipresencial": return "UTC,ULA";
                case "Online": return "UTC";
                default: return "UTC"
            }
        }
        default: return ""
    }
}

const getLeadModality = (
    modality: string // "Presencial" | "Online" | "Flex" | "Semipresencial"
) => {
    switch (modality) {
        case "Presencial": return "Presencial";
        case "Online": return "Online";
        case "Flex": return "Online"; // Applies to "UANE" and "UTEG" offer.
        case "Semipresencial": return "Semipresencial"; // Applies to "ULA" offer.
        default: return "";
    }
};

type OpenFormConfig = {
    title: string;
    subtitle: string;
    conditions: string;
    privacyLink: { link: string; label: string };
};

type ProgramDetailForm = {
    setStatus: (status: { loading: boolean, error: string, valid: boolean, success: boolean }) => void
    submit: boolean
    data?: any;
    config?: OpenFormConfig;
    controls?: any;
}

const ProgramDetailForm = (props: ProgramDetailForm) => {

    const { config, data, setStatus, submit } = props

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [controlsConfig, setControlsConfig] = useState({ ...FormConfig });
    const [tokenActive, setTokenActive] = useState<string>("");
    const [levelsOffer, setLevelsOffer] = useState<any>([]);
    const [filteredPrograms, setFilteredPrograms] = useState<any>([]);
    const [filteredCampus, setFilteredCampus] = useState<any>([]);

    const [personalData, setPersonalData] = useState({
        name: "",
        last_name: "",
        phone: "",
        email: "",
    });

    const [personalDataTouched, setPersonalDataTouched] = useState<{ [key: string]: boolean }>({
        name: false,
        last_name: false,
        phone: false,
        email: false,
    })

    const [personalDataErrors, setPersonalDataErrors] = useState({
        name: false,
        last_name: false,
        phone: false,
        email: false,
    })

    const [academicData, setAcademicData] = useState({
        modality: "",
        level: "",
        program: "",
        campus: ""
    });

    const [academicDataTouched, setAcademicDataTouched] = useState({
        modality: false,
        level: false,
        program: false,
        campus: false
    });

    const [academicDataErrors, setAcademicDataErrors] = useState({
        modality: false,
        level: false,
        program: false,
        campus: false
    })

    const {
        fetchData: fetchEducativeOffer,
        filterByLevel,
        filterByProgram,
        getDataByProgramEC,
        data: educativeOfferData,
        isLoading: isLoadingEO,
        isError: isErrorEO,
        sourceData,
    } = getEducativeOffer();

    const {
        isLoading: isLoadingToken,
        isError: isErrorToken,
        token,
    } = getTokenForms();

    useEffect(() => {
        if (submit) handleSubmit()
    }, [submit]);

    useEffect(() => {
        Validate()
    }, [personalData]);


    useEffect(() => {
        if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
            setTokenActive(`${token.token_type} ${token.access_token}`);
        }
    }, [isLoadingToken, isErrorToken, token]);

    useEffect(() => {
        if (!isLoadingEO && !isErrorEO) {
            setLevelsOffer(Object.entries(educativeOfferData).map(([_, level]: any) => level))
        }
    }, [isLoadingEO, isErrorEO, educativeOfferData]);

    useEffect(() => {
        setStatus({ loading: isLoading, error: isError, valid: isValid, success: isSuccess })
    }, [isLoading, isError, isValid, isSuccess]);

    const validatePersonalDataControl = (control: string, value: string) => {
        if (control === 'email') {
            return !!value.match(configControls.patternEmail)
        }
        if (control === 'phone') {
            return value.trim().length === 10
        }
        return !!value.trim()
    };

    const validatePersonalDataControls = () => !Object.entries(personalData).map(([key, value]: any) => {
        const validity = validatePersonalDataControl(key, value)
        return validity
    }).includes(false)

    const validateAcademicDataControl = (value: string) => {
        return !!value;
    };

    const validateAcademicDataControls = () => !Object.entries(academicData).map((value: any) => {
        return !!value[1];
    }).includes(false)


    const handleProgramSelected = (program: string) => {
        setFilteredCampus([]);
        const campusByProgram = filterByProgram(program);
        setFilteredCampus([...campusByProgram]);
    }

    const handleLevelSelected = (level: string) => {
        setFilteredPrograms([]);
        setFilteredCampus([]);
        const programsByLevel = filterByLevel(level);
        setFilteredPrograms([
            ...programsByLevel?.sort((a, b) => // sort programs alphabetically
                a?.text < b?.text ? -1 : a?.text > b?.text ? 1 : 0
            ),
        ]);
    }

    const handleFetchEducativeOffer = (modality: string) => {
        setFilteredPrograms([]);
        setFilteredCampus([]);
        const businessLineToFetchFrom = getBusinessLineToFetchFrom(businessUnit, modality);
        fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, modality, businessLineToFetchFrom, tokenActive);
    }

    const selectedProgramData = getDataByProgramEC(academicData?.program, academicData?.campus);


    const sendData = async () => {
        const endpoint = process.env.NEXT_PUBLIC_DENTAL_CLINIC_FORM_URL || '';
        const token = process.env.NEXT_PUBLIC_DENTAL_CLINIC_FORM_TOKEN || '';
        setIsLoading(true);

        await axios.post(endpoint, {
            "nombre": personalData?.name?.trim(),
            "apellidos": personalData?.last_name?.trim(),
            "telefono": personalData?.phone?.trim(),
            "correo": personalData?.email?.trim(),
            /* 
            "programa": academicData?.program?.trim(),
            "level": academicData?.level?.trim(),
            "modalidad": academicData?.modality?.trim(),
            "campus": academicData?.campus?.trim(),  
            */
        }, {
            headers: {
                'x-token': token
            }
        })
            .then((res: any) => {
                setIsLoading(false)
                setIsSuccess(true)
            })
            .catch((err: any) => {
                setIsLoading(false);
                setIsError(`${err.response.status}`);
            })
    }

    const Validate = () => {
        const newPersonalDataErrors = {
            name: !validatePersonalDataControl("name", personalData.name) && personalDataTouched.name,
            last_name: !validatePersonalDataControl("last_name", personalData.last_name) && personalDataTouched.last_name,
            phone: !validatePersonalDataControl("phone", personalData.phone) && personalDataTouched.phone,
            email: !validatePersonalDataControl("email", personalData.email) && personalDataTouched.email,
        }

        setPersonalDataErrors({ ...newPersonalDataErrors });

        const newAcademicDataErrors = {
            program: !validateAcademicDataControl(academicData.program) && academicDataTouched.program,
            level: !validateAcademicDataControl(academicData.level) && academicDataTouched.level,
            campus: true,
            modality: true
        }

        setAcademicDataErrors({ ...newAcademicDataErrors });

        const isValidPersonalData = validatePersonalDataControls();
        const isValidAcademicData = validateAcademicDataControls();


        setIsValid(isValidPersonalData && isValidAcademicData)
    }

    const handleSubmit = async () => {
        Validate()
        if (isValid && !isError) {
            sendData()
        }
    }

    return <form>
        <PersonalData
            personalData={personalData}
            setPersonalData={setPersonalData}
            config={config}
            data={data}
            infoControlsTouched={personalDataTouched}
            setInfoControlsTouched={setPersonalDataTouched}
            errorControls={personalDataErrors}
            setErrorControls={setPersonalDataErrors}
            validateControl={validatePersonalDataControl}
        ></PersonalData>

        <AcademicData
            academicData={academicData}
            setAcademicData={setAcademicData}
            infoControlsTouched={academicDataTouched}
            setInfoControlsTouched={setAcademicDataTouched}
            errorControls={academicDataErrors}
            setErrorControls={setAcademicDataErrors}
            validateControl={validateAcademicDataControl}
        ></AcademicData>

    </form>
};

export default ProgramDetailForm;