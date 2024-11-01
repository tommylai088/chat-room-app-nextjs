import SigninForm from "@/components/features/auth/Signin/SigninForm";
import SignupForm from "@/components/features/auth/Signup/SignupForm";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";


function AuthTabs() {
    const [tabIndex, setTabIndex] = useState<number>(0);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    }

    return (
        <Tabs
            index={tabIndex}
            onChange={(index) => handleTabsChange(index)}
            w={{
                base: '80%',
                md: '500px'
            }}
        >
            <TabList>
                <Tab w="50%">Sign in</Tab>
                <Tab w="50%">Sign up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <SigninForm />
                </TabPanel>
                <TabPanel>
                    <SignupForm />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default AuthTabs; 