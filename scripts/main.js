/*
//Dont distribute without permission
//MADE BY Korean SL
//discord : SL357#1860
//yt : https://www.youtube.com/channel/UC4QoASkshclcoI213KoWoxw
//개인톡 : https://open.kakao.com/o/sOcBMAQc
//채팅방 : https://open.kakao.com/o/gYcpPn6d
*/


import {world} from "mojang-minecraft";
import {ModalFormData} from "mojang-minecraft-ui";

const overworld = world.getDimension("overworld");
let openUi = new Map();

world.events.beforeChat.subscribe(data => {
    if(data.message){
        data.cancel=true;
            if(data.sender.getTags().find((tag) => tag.startsWith("sl:"))){
                overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§r[ §7${data.sender.getTags().find((tag) => tag.startsWith("sl:")).slice(3)} §r] ${data.sender.name} §7>§r ${data.message}"}]}`);
            }else{
                overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§r[ §7Member §r] ${data.sender.name} §7>§r ${data.message}"}]}`);
        }
    }
    if(data.message=="!rank"){
        openUi.set(data.sender.name, true);
    }
})

world.events.tick.subscribe(data => {
    if(data.currentTick%20!=0) return;
    for(let player of overworld.getPlayers()){
        if(player.hasTag("sl:remove")){
            player.removeTag(player.getTags().find((tag) => tag.startsWith("sl:")));
            player.removeTag("sl:remove");
        }
        if(openUi.has(player.name)){
        let ui = new ModalFormData();
        ui.title("Chat Rank");
        ui.textField("","enter here","");
        ui.show(player).then(data => {
            openUi.delete(player.name);
            const { formValues, isCanceled } = data;
            if (isCanceled === true) return;
            let input = formValues;
            (input=="") ? player.runCommand(`tellraw @s {"rawtext":[{"text":"§c칭호를 입력해주세요."}]}`) : player.addTag("sl:"+input);
        })
        }
    player.nameTag = `${player.getTags().find((tag) => tag.startsWith("sl:"))==true ? "§r[ §7"+player.getTags().find((tag) => tag.startsWith("sl:")).slice(3)+" §r] "+player.name : "§r[ §7Member §r] "+player.name}`;
    }
})
