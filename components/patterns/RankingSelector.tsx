import Select from '@/components/basics/Select'

interface RankingSelectorOptions {
  rankings: any[]
}

const RankingSelector = (props: RankingSelectorOptions) => {
  return (
    <>
      <Select 
        options={props.rankings} 
        defaultOption={{ label: 'No ranking selected', value: ''}} 
        selected={''}
        title="Select a ranking"
      />
    </>
  )
}
export default RankingSelector