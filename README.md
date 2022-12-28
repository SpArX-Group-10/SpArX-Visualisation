# SpArX-Visualisation
GUI and Visualisation for SpArX Neural Networks


Local-host:
===========

1.  Clone repo from: [https://github.com/SpArX-Group-10/SpArX-Visualisation](https://github.com/SpArX-Group-10/SpArX-Visualisation)

    ```bash
    git clone https://github.com/SpArX-Group-10/SpArX-Visualisation
    ```

2.  Install requirements:
    
    ```bash
    pip install -r server/requirements.txt
    ```
    
3.  Start the server:
    
    ```bash
    python server/server.py
    ```

4. In a separate terminal, install yarn dependencies and start:
   
   ```bash
   yarn install
   yarn start
   ```
    

GUI: Model setup:
===========

### Upload dataset:

![Upload Dataset](readme_imgs/196625.png)
*Upload Dataset*

For example, using the Iris dataset:

![Uploaded Iris dataset](readme_imgs/65547.png)
*Uploaded Iris dataset*

Click on the ticks to choose which features of the dataset you would like to include.

### Neural network structure:

![Neural network structure options](readme_imgs/196636.png)
*Neural network structure options*

To add more layers, click on “Add new layer”.

![Neural network activation function options](readme_imgs/196642.png)
*Neural network activation function options*

You can decide the number of neurons in each layer and select the activation function for each layer.

If you change your mind, you can remove a layer by clicking on “Remove”.

### More hyperparameter options:

Along with choosing the neural network structure, you can decide on other hyperparameters.

![Hyperparameter options](readme_imgs/196648.png)
*Hyperparameter options*

Note: The number of epochs must be an integer (it will not let you put a non-integer value)

### Clustering options:
#### Global merging
![Global merging](readme_imgs/196654.png)
*Global merging*
#### Local merging
![Local merging](readme_imgs/294925.png)
*Local merging*

### Model setup is done!

Depending on the size of your dataset, neural network, number of epochs… etc it might take a long time to get your visualisation.

![Model setup waiting for server](readme_imgs/65555.png)
*Model setup waiting for server*

Visualisation:
===========

### Starting off:

You will start off by seeing the output layer.

![Output layer](readme_imgs/294939.png)
*Output layer*

### To show a previous layer:

Click on one of the output neurons to display the previous layer.

![Click on output neuron](readme_imgs/262190.png)
*Click on output neuron*

### Piechart visualisation:

Click on “Show Chart” to see the piechart visualisation.

This shows whether a previous node is a “Supporter” (in green) or an “Attacker” (in red).

![Pie chart](readme_imgs/262198.png)
*Show pie chart*

You can hover over the piechart to see which areas represent which attacker/supporter:

![Show pie chart supporters](readme_imgs/98593.png)
*Show pie chart supporters*

![Show pie chart attackers](readme_imgs/196672.png)
*Show pie chart attackers*

### Visualisation options:

You can customise the number of layers and supporters/attackers to display per click.

![Visualisation options](readme_imgs/589833.png)
*Visualisation options*

#### Previous layers to render:

You can choose to display from 1 to all previous layers when clicking on a neuron.

![Render previous layers option](readme_imgs/589834.png)
*Render previous layers option*

#### Top attackers and supporters:

You can display from the top 1 to all supporters/attackers per click. How does this work with the multi-layer render option? We only display the top attackers/supporters for all neurons in each newly rendered layer.

![Top attackers/supporters option](readme_imgs/589835.png)
*Top attackers/supporters option*

### Instructions:

For some guidance on how to navigate the visualisation, click on the 'Question Mark' to view some Instructions.

![Instructions Icon](readme_imgs/589836.png)
*Instructions icon*

Some helpful instructions on how to navigate the visualisation.
![Instructions](readme_imgs/589837.png)
*Instructions*