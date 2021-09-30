import React from 'react'
import { TextField, Grid, Select, MenuItem } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const FormInput = ({name, label, required}) => {
    const {control}= useFormContext();

    return (
      <Grid item xs={12} sm={6}>
        <Controller
          render={({ field }) => (
            <TextField {...field} fullWidth label={label} required={required}/>
          )}
          control={control}
          name={name}
          defaultValue=""
        />
      </Grid>
    );
}

export default FormInput
