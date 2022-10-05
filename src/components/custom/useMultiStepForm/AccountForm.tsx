import FormWrapper from "./FormWrapper";
import {FC} from "react";

type AccountData = {
    email: string
    password: string
}

type AccountFormProps = AccountData & {
    updateFields: (fields: Partial<AccountData>) => void
}

const AccountForm:FC<AccountFormProps> = ({
                                email,
                                password,
                                updateFields,
                            }) => {
    return (
        <FormWrapper title="Account Creation">
            <label>Email</label>
            <input
                autoFocus
                required
                type="email"
                value={email}
                onChange={e => updateFields({ email: e.target.value })}
            />
            <label>Password</label>
            <input
                required
                type="password"
                value={password}
                onChange={e => updateFields({ password: e.target.value })}
            />
        </FormWrapper>
    )
}

export default AccountForm;