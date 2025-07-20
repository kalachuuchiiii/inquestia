import AnimationWrapper from '../AnimationWrapper.jsx';
import useScroll from '../../hooks/useScroll.js';

import List from '../List.jsx';
import { AnimatePresence } from 'framer-motion';
import OptionButton from '../options/OptionButton.jsx';
import Textarea from '../html/Textarea.jsx';
import useCreateQuestion from '../../hooks/useCreateQuestion.js';

const NewQuestionModal = ({ onClose, createQuestion }) => {

  useScroll({ freeze: true });
  const { quest, handleChange, isCustomOptions, toggleMultipleChoice, removeOption, toggleRequired, handleChangeCustomOptions, handleAddOption, error, loading, showOptionManager, option, setOption, setShowOptionManager, validateQuestionForm } = useCreateQuestion();

  const handleCreateQuestion = (question = {}) => {
    try {
      validateQuestionForm(question, () => {
        createQuestion(question);
        onClose();
      });
    } catch (e) {
      console.log(e);
    }
  }


  return <AnimationWrapper onClick={onClose} className="fixed inset-0 z-30" variants="fade">
    <div className="w-full h-full bg-black/80 flex flex-col items-center justify-center gap-6 ">
      <AnimationWrapper variants="adapt" onClick={(e) => e.stopPropagation()} className="p-4 w-11/12 overflow-hidden rounded-xl   bg-neutral-50">
        <p className="text-sm  w-full text-center">Add new question</p>
        <div>
          <div className="mb-4">
            <Textarea requiredDisplay={quest.required} value={quest.question || ''} name="question" onChange={handleChange} className="p-2 resize-none  outline-1 w-full outline-none" placeholder="New Question" />
            <div className="text-xs flex gap-2 items-center">
              <input onChange={toggleRequired} checked={quest.required || false} type="checkbox" />
              <p>Required</p>
            </div>
          </div>
          <p className="text-xs w-10/12 text-left">In which way do you want the respondent to answer?</p>
          <div className="flex items-start flex-col text-sm gap-2 my-4 mx-2">
            <button name="text" className={`${(!isCustomOptions && quest.option === "text") ? 'bg-blue-100 outline-blue-200' : 'outline-none'} rounded-lg p-2 outline-1`} onClick={handleChangeCustomOptions} value={false} type="radio">Through Text</button>
            <div className="flex gap-2 items-center">
              <button name="custom" className={`${isCustomOptions && quest.option === "custom" ? 'bg-blue-100 outline-blue-200' : 'outline-none'} rounded-lg p-2 outline-1`} onClick={handleChangeCustomOptions} value={true}>Selected Options</button>
              {
                (isCustomOptions && !showOptionManager) ? <button onClick={() => setShowOptionManager(true)} className="text-xs">
                  Show
                </button> : isCustomOptions && <button onClick={() => setShowOptionManager(false)} className="text-xs">
                  Hide
                </button>
              }
            </div>
          </div>
          <AnimatePresence>
            {
              (isCustomOptions && showOptionManager) && <AnimationWrapper variants="emerge">
                <div className="flex flex-col gap-2 items-start py-2 pr-2">
                  <div className="flex items-center gap-2">
                    <input value={option} onChange={(e) => setOption(e.target.value)} placeholder="New Option" className="outline-1 p-2 rounded" />
                    <button className="p-2 grid place-content-center rounded-lg" onClick={handleAddOption} value={option}>+</button>
                  </div>
                  <div className="flex gap-2 items-center text-xs">
                    <input checked={quest?.choices?.allowMultipleChoice || false} onChange={toggleMultipleChoice} type="checkbox" />
                    <p>Multiple Choice</p>
                  </div>
                </div>
                <AnimationWrapper variants="adapt" layout >
                  <List animation={true} className="items-start gap-1  w-full flex flex-wrap duration-200" list={quest.choices.list} renderItem={({ label, value }) => <OptionButton key={value} value={value} label={label} onRemove={() => removeOption(value)} />} />
                </AnimationWrapper>
              </AnimationWrapper>
            }
          </AnimatePresence>
        </div>
        <div className="w-full flex justify-between items-center text-right">
          <p className="text-xs text-red-400">{error && error}</p>

          <button onClick={() => handleCreateQuestion(quest)} className="text-base text-blue-500 mt-3 mr-3">Add</button>
        </div>
      </AnimationWrapper>
    </div>
  </AnimationWrapper>
}

export default NewQuestionModal