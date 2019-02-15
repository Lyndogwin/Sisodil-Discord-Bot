// This program will start a node process and restart it if it 
// fails
# include "helper.h" // check header for suspected dependencies 


void create_process(void);

// globals
char * args[3] = {(char *)"node", (char*)"sisodil.js", NULL};
int main(void){
    create_process();
}

void create_process(){
    pid_t id = fork();
    int stat;
    
    if (id == -1){
        cout << "Error in process fork" <<endl;
    }
    else if (id == 0){
        cout << "Child process starting "<<*args[0]<<" "<<*args[1]<<endl;
        
        execvp(args[0],args);
    }
    else{
        wait(&stat);
        args[0] = (char *)"./runSisodil";
        args[1] = (char *)" ";
        execvp(args[0], args);
    }
}