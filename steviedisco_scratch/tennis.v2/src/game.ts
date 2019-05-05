import { JsInject } from "lib/jsInject";

import IconfigService from "services/IconfigService";
import ItimeService from "services/ItimeService";
import IinputService from "services/IinputService";
import IupdateService from "services/IupdateService";
import IrenderService from "services/IrenderService";

import configService from "services/concrete/configService";
import timeService from "services/concrete/timeService";
import inputService from "services/concrete/inputService";
import updateService from "services/concrete/updateService";
import renderService from "services/concrete/renderService";

export class game
{
    $jsInject: JsInject = new JsInject();

    $configService: IconfigService;
    $timeService: ItimeService;
    $inputService: IinputService;
    $updateService: IupdateService;
    $renderService: IrenderService;

    run(): void
    { 
        this.registerServices();
        this.initialise();
        this.gameLoop();
    };

    registerServices(): void
    {
        this.$configService = this.$jsInject.register("IconfigService", [configService]);
        this.$timeService = this.$jsInject.register("ItimeService", [timeService]);
        this.$inputService = this.$jsInject.register("IinputService", [inputService]);
        this.$updateService = this.$jsInject.register("IupdateService", [updateService]);
        this.$renderService = this.$jsInject.register("IrenderService", [renderService]);
    };

    initialise(): void
    {
        this.$renderService.initialise(document);
    };

    gameLoop(): void
    {
        let previous: number = this.$timeService.getCurrentTime();  
        let lag: number = 0.0; 
        let msPerUpdate = 1000 / this.$configService.targetFPS;

        while (true)
        {
            let current = this.$timeService.getCurrentTime();
            let elapsed = current - previous;

            previous = current;
            lag += elapsed;

            this.$inputService.process();

            while (lag >= msPerUpdate)
            {
                this.$updateService.update();
                lag -= msPerUpdate;
            }

            this.$renderService.render();
        }
    };
}