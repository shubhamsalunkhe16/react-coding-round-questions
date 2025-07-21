import StarRatingWrapper from "./components/StarRatingWrapper";
import ProgressBarWrapper from "./components/ProgressBarWrapper";
import AccordionWrapper from "./components/AccordionWrapper";
import CarouselWrapper from "./components/CarouselWrapper";
import CountdownTimerWrapper from "./components/CountdownTimerWrapper";
import OtpInputWrapper from "./components/OtpInputWrapper";
import PaginationWrapper from "./components/PaginationWrapper";
import PasswordGeneratorWrapper from "./components/PasswordGeneratorWrapper";
import ToastWrapper from "./components/ToastWrapper";
import TodoListWrapper from "./components/TodoListWrapper";
import StopwatchWrapper from "./components/StopwatchWrapper";
import FileExplorerWrapper from "./components/FileExplorerWrapper";
import TicTacToeWrapper from "./components/TicTacToeWrapper";
import ModalWrapper from "./components/ModalWrapper";
import PopoverWrapper from "./components/PopoverWrapper";
import InfiniteScrollWrapper from "./components/InfiniteScrollWrapper";
import AutoCompleteWrapper from "./components/AutoCompleteWrapper";
import VirtualizedListWrapper from "./components/VirtualizedListWrapper";
import TabsWrapper from "./components/TabsWrapper";
import FormValidationWrapper from "./components/FormValidationWrapper";
import StepperWrapper from "./components/StepperWrapper";
import DragDropWrapper from "./components/DragDropWrapper";

const App = () => {
  return (
    <div style={{ fontSize: "var(--font-size)" }}>
      <DragDropWrapper />
      <hr />
      <StepperWrapper />
      <hr />
      <FormValidationWrapper />
      <hr />
      <TabsWrapper />
      <hr />
      <VirtualizedListWrapper />
      <hr />
      <AutoCompleteWrapper />
      <hr />
      <PopoverWrapper />
      <hr />
      <ModalWrapper />
      <hr />
      <TicTacToeWrapper />
      <hr />
      <FileExplorerWrapper />
      <hr />
      <StopwatchWrapper />
      <hr />
      <TodoListWrapper />
      <hr />
      <ToastWrapper />
      <hr />
      <PasswordGeneratorWrapper />
      <hr />
      <PaginationWrapper />
      <hr />
      <OtpInputWrapper />
      <hr />
      <CountdownTimerWrapper />
      <hr />
      <CarouselWrapper />
      <hr />
      <AccordionWrapper />
      <hr />
      <StarRatingWrapper />
      <hr />
      <ProgressBarWrapper />
      <hr />
      <InfiniteScrollWrapper />
    </div>
  );
};

export default App;
