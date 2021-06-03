import Head from 'next/head'
import css from 'styled-jsx/css'
import FormField from '@/components/basics/FormField'
import Button from '@/components/basics/Button'
import useForm from '@/hooks/useForm'

function GetStarted() {
  /**
   * Setup initial values
   */
  const initialValues = {
    leagueName: '',
    teamsInLeague: 10
  }

  const createLeague = (values: any, errors: any) => {
    if (errors) { return }
    console.log('Form submitted: ', values)
  }

  const validate = (values: any) => {
    console.log('Validating...')
    const errors: any = {}
    if (values.leagueName === '') {
      errors.leagueName = 'Please enter a league name to continue.'
    }
    console.log(values.teamsInLeague)
    if (values.teamsInLeague === '') {
      errors.teamsInLeague = 'Please enter the number of teams in your league to continue.'
    }
    if (values.teamsInLeague >= 6 && values.teamsInLeague > 15) {
      errors.teamsInLeague = "Please enter a valid number of teams in your league (between 6 and 15)."
    }
    return errors
  }

  /**
   * Setup state hooks
   */
  const { 
    values, 
    errors, 
    touched,
    handleChange, 
    handleBlur,
    handleSubmit 
  } = useForm({ initialValues, onSubmit: createLeague, validate })
  
  /* compute if the form can be submitted */
  const canSubmitForm = touched.leagueName && Object.keys(errors).length === 0

  return (
    <>
      <Head>
        <title>Get Started | Sign Stealing</title>
      </Head>
      <section className="get-started">
        <div className="intro">
          <h1>Let's get started.</h1>
          <p>Add your league details to get the edge on your league mates!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Add League Details</h3>
          <FormField 
            name="leagueName" 
            label="League Name" 
            value={values.leagueName}
            error={errors.leagueName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormField 
            name="teamsInLeague" 
            type="number"
            label="Teams in League" 
            value={values.teamsInLeague}
            error={errors.teamsInLeague}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="form-actions">
            <Button 
              label="Submit" 
              type="submit" 
              disabled={!canSubmitForm} 
            />
          </div>
        </form>
        <div className="idb-info-pane">
        </div>
      </section>
      <style jsx>{ pageStyles }</style>
    </>
  )
}

/**
 * Define the styles for this page.
 * Using styled-jsx in this way gives us Vue-like single file component.
 * We can also use the resolve tag to create dynamic & scoped CSS definitions
 * @see https://github.com/vercel/styled-jsx#the-resolve-tag
 */
const pageStyles = css`
  .get-started {
    min-height: 50vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }

  .get-started .intro {
    padding-right: var(--s-xl);
    margin: var(--s-lg) 0;
  }


  .get-started form {
    width: 30rem;
    min-height: 15rem;
    padding: 0 var(--s-xl);
    border: 1px solid var(--border-color-light);
    border-radius: var(--border-radius-heavy);
    margin-top: var(--s);
    margin-bottom: var(--s);
    background-color: var(--white);
  }

  .form-title, .form-actions {
    padding: var(--s) var(--s-xl);
    margin-left: calc(var(--s-xl) * -1);
    margin-right: calc(var(--s-xl) * -1);
  }

  .form-title {
    margin-bottom: var(--s-lg);
    border-bottom: 1px solid var(--border-color-light);
  }

  .form-actions {
    margin-top: var(--s-lg);
    border-top: 1px solid var(--border-color-light);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .idb-info-pane {
    width: 100%;
  }
`

export default GetStarted